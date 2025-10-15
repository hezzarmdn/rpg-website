const input = document.getElementById("input");
const output = document.getElementById("output");

function show(text) {
  const div = document.createElement("div");
  div.textContent = "> " + text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

// Deteksi tekan Enter, pastiin gak nge-refresh halaman
input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // mencegah reload form
    const command = input.value.trim();
    if (!command) return;

    show(command);
    input.value = "";

    const username = localStorage.getItem("username") || "guest";

    try {
      const res = await fetch("/api/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command, username }),
      });

      const data = await res.json();
      if (data.result) {
        if (typeof data.result === "object") {
          show(JSON.stringify(data.result, null, 2));
        } else {
          show(data.result);
        }
      } else {
        show("❓ Tidak ada respon dari server.");
      }
    } catch (err) {
      show("⚠️ Gagal konek ke server: " + err.message);
    }
  }
});

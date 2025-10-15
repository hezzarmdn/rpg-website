const input = document.getElementById("input");
const output = document.getElementById("output");

function show(text) {
  const div = document.createElement("div");
  div.textContent = "> " + text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    const command = input.value.trim();
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
      show(JSON.stringify(data.result, null, 2));
    } catch (err) {
      show("⚠️ Gagal konek ke server.");
    }
  }
});

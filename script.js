const input = document.getElementById("input");
const output = document.getElementById("output");

function show(text, isSystem = false) {
  const div = document.createElement("div");
  div.textContent = (isSystem ? "" : "> ") + text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

async function sendCommand(command) {
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
        show(JSON.stringify(data.result, null, 2), true);
      } else {
        show(data.result, true);
      }
    } else {
      show("⚠️ Tidak ada respons dari server.", true);
    }
  } catch (err) {
    show("⚠️ Gagal konek ke server.", true);
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    const command = input.value.trim();
    show(command);
    sendCommand(command);
    input.value = "";
  }
});

const output = document.getElementById("output");
const input = document.getElementById("input");

const player = {
  name: "Player",
  gold: 100,
  inventory: []
};

function print(text) {
  output.innerHTML += `<p>${text}</p>`;
  output.scrollTop = output.scrollHeight;
}

function handleCommand(command) {
  const cmd = command.trim().toLowerCase();
  if (cmd === "/inventory") {
    if (player.inventory.length === 0) print("Inventori kosong.");
    else print("Inventori: " + player.inventory.join(", "));
  } else if (cmd === "/shop") {
    print("Toko: pedang (50 gold), perisai (40 gold)");
  } else if (cmd === "/help") {
    print("Perintah tersedia: /inventory, /shop, /help");
  } else {
    print("Perintah tidak dikenal.");
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value;
    print("> " + command);
    handleCommand(command);
    input.value = "";
  }
});

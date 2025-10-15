const input = document.getElementById("input");
const output = document.getElementById("output");

function print(text) {
  const p = document.createElement("div");
  p.textContent = text;
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

print("Selamat datang di dunia RPG!");
print("Ketik /help untuk melihat perintah yang tersedia.\n");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value.trim();
    input.value = "";

    if (command === "/help") {
      print("Perintah tersedia:\n/shop - Buka toko\n/stats - Lihat status pemain");
    } else if (command === "/shop") {
      print("Toko: Pedang - 100 gold | Perisai - 150 gold");
    } else if (command === "/stats") {
      print("Nama: Petualang\nLevel: 1\nHP: 100\nGold: 50");
    } else {
      print(`Perintah '${command}' tidak dikenal.`);
    }
  }
});

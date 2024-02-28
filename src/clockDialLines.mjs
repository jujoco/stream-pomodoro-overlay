let clockEl = document.querySelector(".dial-lines");
let fragmentLines = document.createDocumentFragment();

for (let i = 1; i < 60; i++) {
	const line = document.createElement("div");
	line.classList.add("dial-line");
	line.dataset.glow = "false";
	line.style.transform = `rotate( ${i * 6}deg )`;
	fragmentLines.append(line);
}

clockEl.appendChild(fragmentLines);

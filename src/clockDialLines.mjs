/**
 * @param {string} clockSelector
 * @param {number} [lineQty=50]
 */
export const renderDialLines = (clockSelector, lineQty = 50) => {
	let clockEl = document.querySelector(clockSelector);
	let fragmentLines = document.createDocumentFragment();

	for (let i = 0; i < 60; i++) {
		const line = document.createElement("div");
		line.classList.add("dial-line");
		line.style.transform = `rotate(${i * 6}deg)`;
		line.dataset.glow = "mute";

		if (i < lineQty) {
			setTimeout(() => {
				line.dataset.glow = "glow";
			}, 60000 * (i + 1)); // add glow ever minute
		} else {
			line.dataset.glow = "disable";
		}

		fragmentLines.append(line);
	}

	clockEl.appendChild(fragmentLines);
};

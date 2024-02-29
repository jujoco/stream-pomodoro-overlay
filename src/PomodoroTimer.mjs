import { CountdownTimer } from "./countdownTimer.mjs";

export class PomodoroTimer extends CountdownTimer {
	#minuteIntervalId = null;

	constructor(minutes = 50, updateCallback, finishCallback) {
		super(minutes, updateCallback, finishCallback);
		this.minutes = minutes;
		this.#renderDialLines();
	}

	start() {
		super.start();
		this.#minuteIntervalId = setInterval(() => {
			// Check if a minute has passed
			if (this.getSeconds() % 60 === 0) {
				this.#updateDialLines();
			}
		}, 1000);
	}

	stop() {
		super.stop();
		clearInterval(this.#minuteIntervalId);
	}

	#renderDialLines() {
		const dialContainer = document.querySelector(".dial-lines");
		const fragmentLines = document.createDocumentFragment();
		dialContainer.innerHTML = "";

		for (let i = 0; i < 60; i++) {
			const line = document.createElement("div");
			line.classList.add("dial-line");
			line.style.transform = `rotate(${i * 6}deg)`;
			line.dataset.glow = i < this.minutes ? "mute" : "disable";
			fragmentLines.append(line);
		}
		dialContainer.appendChild(fragmentLines);
	}

	#updateDialLines() {
		const dialLines = document.querySelectorAll(".dial-line");
		const minutesPassed = this.getSeconds() / 60;
		dialLines[this.minutes - minutesPassed - 1].dataset.glow = "glow";
	}
}

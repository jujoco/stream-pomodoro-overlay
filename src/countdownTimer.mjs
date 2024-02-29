import { paramMinutes } from "./searchParamOptions.mjs";

class CountdownTimer {
	#secondsInMinute = 60;
	#tickIntervalId = null;
	#glowIntervalId = null;
	#initialMinutes;
	#seconds;

	constructor(minutes, updateCallback, finishCallback) {
		this.#initialMinutes = minutes;
		this.#seconds = minutes * this.#secondsInMinute;
		this.finishCallback = finishCallback;
		this.updateCallback = updateCallback;
		this.#renderDialLines();
	}

	start() {
		this.#tickIntervalId = setInterval(() => {
			this.#tick();
			this.updateCallback(this.getTime());
		}, 1000);
	}

	stop() {
		clearInterval(this.#tickIntervalId);
		this.#tickIntervalId = null;
		clearInterval(this.#glowIntervalId);
		this.#glowIntervalId = null;
	}

	reset(minutes) {
		this.#seconds = minutes * this.#secondsInMinute;
		this.updateCallback(this.getTime());
		this.#renderDialLines();
	}

	getTime() {
		let minutes = Math.floor(this.#seconds / this.#secondsInMinute);
		let seconds = this.#seconds % this.#secondsInMinute;
		let secondsAsString = seconds < 10 ? "0" + seconds : seconds;
		let minutesAsString = minutes < 10 ? "0" + minutes : minutes;
		return minutesAsString + ":" + secondsAsString;
	}

	#tick() {
		if (this.#seconds > 0) {
			this.#seconds -= 1;
			// Check if a minute has passed
			if (this.#seconds % 60 === 0) {
				this.#updateDialLines();
			}
		} else {
			this.stop();
			this.finishCallback();
		}
	}

	#renderDialLines() {
		const dialContainer = document.querySelector(".dial-lines");
		const fragmentLines = document.createDocumentFragment();
		dialContainer.innerHTML = "";

		for (let i = 0; i < 60; i++) {
			const line = document.createElement("div");
			line.classList.add("dial-line");
			line.style.transform = `rotate(${i * 6}deg)`;
			line.dataset.glow = i < this.#initialMinutes ? "mute" : "disable";
			fragmentLines.append(line);
		}
		dialContainer.appendChild(fragmentLines);
	}

	#updateDialLines() {
		const dialLines = document.querySelectorAll(".dial-line");
		const minutesPassed = this.#seconds / 60;
		dialLines[this.#initialMinutes - minutesPassed - 1].dataset.glow = "glow";
	}
}

window.countdown = new CountdownTimer(paramMinutes, mountTime, unmountTime);
countdown.start();
function mountTime(time) {
	document.querySelector(".countdown").innerHTML = time;
}

function unmountTime() {
	document.querySelector(".countdown").innerHTML = "00:00";
}

import {
	paramMinutes,
	paramBreak,
	paramSets,
	paramTheme,
} from "./searchParamOptions.mjs";

class CountdownTimer {
	#secondsInMinute = 60;
	#tickIntervalId = null;
	#seconds;

	constructor(minutes = 50, updateCallback, finishCallback) {
		this.#seconds = minutes * this.#secondsInMinute;
		this.finishCallback = finishCallback;
		this.updateCallback = updateCallback;
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
	}

	reset(minutes) {
		this.#seconds = minutes * this.#secondsInMinute;
		this.updateCallback(this.getTime());
	}

	getSeconds() {
		return this.#seconds;
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
		} else {
			this.stop();
			this.finishCallback();
		}
	}
}

class PomodoroTimer extends CountdownTimer {
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

const timerOptions = {
	minutes: paramMinutes,
	break: paramBreak,
	sets: paramSets,
	theme: paramTheme,
};

window.pomodoroTimer = new PomodoroTimer(paramMinutes, mountTime, unmountTime);
window.pomodoroTimer.start();

function mountTime(time) {
	document.querySelector(".countdown").innerHTML = time;
}

function unmountTime() {
	document.querySelector(".countdown").innerHTML = "00:00";
}

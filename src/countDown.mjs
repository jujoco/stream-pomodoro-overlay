import { renderDialLines } from "./clockDialLines.mjs";
import { paramMinutes } from "./searchParamOptions.mjs";

class Countdown {
	#secondsInMinute = 60;
	#intervalId = null;
	#seconds;

	constructor(minutes, updateCallback, finishCallback) {
		this.#seconds = minutes * this.#secondsInMinute;
		this.finishCallback = finishCallback;
		this.updateCallback = updateCallback;
		renderDialLines(".dial-lines", minutes);
	}

	start() {
		this.#intervalId = setInterval(() => {
			this.#tick();
			this.updateCallback(this.getTime());
		}, 1000);
	}

	stop() {
		clearInterval(this.#intervalId);
		this.#intervalId = null;
	}

	reset(minutes) {
		this.#seconds = minutes * this.#secondsInMinute;
		this.updateCallback(this.getTime());
	}

	getTime() {
		let minutes = Math.floor(this.#seconds / this.#secondsInMinute);
		let seconds = this.#seconds % this.#secondsInMinute;
		let secondsAsString = seconds < 10 ? "0" + seconds : seconds;
		return minutes + ":" + secondsAsString;
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

window.countdown = new Countdown(paramMinutes, mountTime);

function mountTime(time) {
	document.querySelector(".countdown").innerHTML = time;
}

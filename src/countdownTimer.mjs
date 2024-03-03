export class CountdownTimer {
	#secondsInMinute = 60;
	#tickIntervalId = null;
	#initialMinutes;
	#seconds;

	constructor(minutes = 60, updateCallback, finishCallback) {
		this.#seconds = minutes * this.#secondsInMinute;
		this.#initialMinutes = minutes;
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

	reset() {
		this.#seconds = this.#initialMinutes * this.#secondsInMinute;
		this.updateCallback(this.getTime());
	}

	getTime() {
		let minutes = Math.floor(this.#seconds / this.#secondsInMinute);
		let seconds = this.#seconds % this.#secondsInMinute;
		let secondsAsString = seconds < 10 ? "0" + seconds : seconds;
		let minutesAsString = minutes < 10 ? "0" + minutes : minutes;
		return minutesAsString + ":" + secondsAsString;
	}

	getSeconds() {
		return this.#seconds;
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

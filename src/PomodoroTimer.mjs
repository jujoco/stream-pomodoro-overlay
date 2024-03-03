import { CountdownTimer } from "./countdownTimer.mjs";

export class PomodoroTimer extends CountdownTimer {
	#minuteIntervalId = null;
	#statusOption = {
		PLAYING: "PLAYING",
		PAUSED: "PAUSED",
	};
	status = "PAUSED";
	sessionsCount = 0;

	constructor(
		updateCallback,
		finishCallback,
		options = {
			minutes: 50,
			break: 10,
			sessions: 3,
			theme: "ALL",
		}
	) {
		super(options.minutes, updateCallback, finishCallback);
		this.minutes = options.minutes;
		this.break = options.break;
		this.sessionsLimit = options.sessions;
		this.updateCallback = updateCallback;
		this.#renderDialLines();
	}

	togglePlayPause() {
		if (this.status === this.#statusOption.PAUSED) {
			this.status = this.#statusOption.PLAY;
			this.play();
		} else {
			this.status = this.#statusOption.PAUSED;
			this.pause();
		}
	}

	play() {
		super.start();
		this.#minuteIntervalId = setInterval(() => {
			// Check if a minute has passed
			if (this.getSeconds() % 60 === 0) {
				this.#updateDialLines();
			}
		}, 1000);
	}

	pause() {
		super.stop();
		clearInterval(this.#minuteIntervalId);
	}

	reset() {
		super.reset();
		this.#renderDialLines();
	}

	#renderDialLines() {
		const dialContainer = document.querySelector(".dial-lines");
		const fragmentLines = document.createDocumentFragment();

		for (let i = 0; i < 60; i++) {
			const line = document.createElement("div");
			line.classList.add("dial-line");
			line.style.transform = `rotate(${i * 6}deg)`;
			line.dataset.glow = i < this.minutes ? "mute" : "disable";
			fragmentLines.append(line);
		}

		dialContainer.innerHTML = "";
		dialContainer.appendChild(fragmentLines);
	}

	#updateDialLines() {
		const dialLines = document.querySelectorAll(".dial-line");
		const minutesPassed = this.getSeconds() / 60;
		dialLines[this.minutes - minutesPassed - 1].dataset.glow = "glow";
	}
}

import {
	paramMinutes,
	paramBreak,
	paramSets,
	paramTheme,
} from "./searchParamOptions.mjs";

import { PomodoroTimer } from "./PomodoroTimer.mjs";

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

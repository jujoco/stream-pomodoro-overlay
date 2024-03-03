import {
	paramFocus,
	paramBreak,
	paramSessions,
	paramTheme,
} from "./searchParamOptions.mjs";
import { PomodoroTimer } from "./PomodoroTimer.mjs";

const timerOptions = {
	minutes: paramFocus,
	break: paramBreak,
	sessions: paramSessions,
	theme: paramTheme,
};

const app = document.querySelector(".app-container");
app.classList.add(paramTheme);
const countdown = app.querySelector(".countdown");
const drawer = app.querySelector(".drawer-container");
const drawerButton = drawer.querySelector(".drawer-container-btn");
const playPauseButton = drawer.querySelector("#playPauseButton");
const resetButton = drawer.querySelector("#resetButton");
const themeSelect = drawer.querySelector("#themeSelect");
const focusSelect = drawer.querySelector("#focusSelect");
const breakSelect = drawer.querySelector("#breakSelect");
const sessionsSelect = drawer.querySelector("#sessionsSelect");

drawerButton.addEventListener("click", () => {
	const state = drawer.dataset.isOpen === "true" ? true : false;
	drawer.dataset.isOpen = !state;
});

function mountTime(time) {
	countdown.innerHTML = time;
}

function unmountTime() {
	countdown.innerHTML = "DONE";
}

const pomodoroTimer = new PomodoroTimer(mountTime, unmountTime, timerOptions);

countdown.innerHTML = pomodoroTimer.getTime();
playPauseButton.addEventListener("click", () => {
	pomodoroTimer.togglePlayPause();
});

resetButton.addEventListener("click", () => {
	pomodoroTimer.reset();
});

focusSelect.value = paramFocus;
focusSelect.addEventListener("change", (e) => {
	const selectValue = e.target.value;
	var urlParams = new URLSearchParams(window.location.search);
	urlParams.set("focus", selectValue);
	window.location.href = window.location.pathname + "?" + urlParams;
});

breakSelect.value = paramBreak;
breakSelect.addEventListener("change", (e) => {
	const selectValue = e.target.value;
	var urlParams = new URLSearchParams(window.location.search);
	urlParams.set("break", selectValue);
	window.location.href = window.location.pathname + "?" + urlParams;
});

sessionsSelect.value = paramSessions;
sessionsSelect.addEventListener("change", (e) => {
	const selectValue = e.target.value;
	var urlParams = new URLSearchParams(window.location.search);
	urlParams.set("sessions", selectValue);
	window.location.href = window.location.pathname + "?" + urlParams;
});

themeSelect.value = paramTheme;
themeSelect.addEventListener("change", (e) => {
	const selectValue = e.target.value;
	var urlParams = new URLSearchParams(window.location.search);
	urlParams.set("theme", selectValue);
	window.location.href = window.location.pathname + "?" + urlParams;
});

const url = document.location.search;
const searchParams = new URLSearchParams(url);
const defaultMinutes = 50;
const defaultBreak = 10;
const defaultSessions = 3;
export const themeOptions = {
	OFF: "themeOFF",
	ALL: "themeALL",
	WHITE: "themeWHITE",
	RED: "themeRED",
	ORANGE: "themeORANGE",
	YELLOW: "themeYELLOW",
	GREEN: "themeGREEN",
	TEAL: "themeTEAL",
	BLUE: "themeBLUE",
	PURPLE: "themePURPLE",
	MAGENTA: "themeMAGENTA",
};

/** @type {number} paramMinutes */
let paramMinutes = parseInt(searchParams.get("focus")) || defaultMinutes;

/** @type {number} paramBreak */
let paramBreak = parseInt(searchParams.get("break")) || defaultBreak;

/** @type {number} paramSessions */
let paramSessions = parseInt(searchParams.get("sessions")) || defaultSessions;

const parseTheme = searchParams.get("theme")?.toUpperCase();
/** @type {string} paramTheme */
const paramTheme = themeOptions[parseTheme] || themeOptions.OFF;

paramMinutes = paramMinutes < 1 || paramMinutes > 60 ? 50 : paramMinutes;
paramBreak = paramBreak < 1 || paramBreak > 60 ? defaultBreak : paramBreak;
paramSessions =
	paramSessions < 1 || paramSessions > 10 ? defaultSessions : paramSessions;

export { paramMinutes, paramBreak, paramSessions, paramTheme };

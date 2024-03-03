const url = document.location.search;
const searchParams = new URLSearchParams(url);
const defaultFocus = 50;
const defaultBreak = 10;
const defaultSessions = 3;
export const themeOptions = {
	OFF: "OFF",
	ALL: "ALL",
	WHITE: "WHITE",
	RED: "RED",
	ORANGE: "ORANGE",
	YELLOW: "YELLOW",
	GREEN: "GREEN",
	TEAL: "TEAL",
	BLUE: "BLUE",
	PURPLE: "PURPLE",
	MAGENTA: "MAGENTA",
};

/** @type {number} paramFocus */
let paramFocus = parseInt(searchParams.get("focus")) || defaultFocus;

/** @type {number} paramBreak */
let paramBreak = parseInt(searchParams.get("break")) || defaultBreak;

/** @type {number} paramSessions */
let paramSessions = parseInt(searchParams.get("sessions")) || defaultSessions;

const parseTheme = searchParams.get("theme")?.toUpperCase();
/** @type {string} paramTheme */
const paramTheme = themeOptions[parseTheme] || themeOptions.ALL;

paramFocus = paramFocus < 1 || paramFocus > 60 ? 50 : paramFocus;
paramBreak = paramBreak < 1 || paramBreak > 60 ? defaultBreak : paramBreak;
paramSessions =
	paramSessions < 1 || paramSessions > 10 ? defaultSessions : paramSessions;

export { paramFocus, paramBreak, paramSessions, paramTheme };

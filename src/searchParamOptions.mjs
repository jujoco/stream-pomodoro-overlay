const url = document.location.search;
const searchParams = new URLSearchParams(url);
const defaultMinutes = 50;
const defaultBreak = 10;
const defaultSets = 3;
const defaultTheme = "ALL";
const themeOptions = {
	RED: "RED",
	ORANGE: "ORANGE",
	YELLOW: "YELLOW",
	GREEN: "GREEN",
	TEAL: "TEAL",
	BLUE: "BLUE",
	PURPLE: "PURPLE",
	MAGENTA: "MAGENTA",
};

/** @type {number} paramMinutes */
let paramMinutes = parseInt(searchParams.get("focus")) || defaultMinutes;

/** @type {number} paramBreak */
let paramBreak = parseInt(searchParams.get("break")) || defaultBreak;

/** @type {number} paramSets */
let paramSets = parseInt(searchParams.get("sets")) || defaultSets;

/** @type {string} paramTheme */
const parseTheme = searchParams.get("theme")?.toUpperCase();
const paramTheme = themeOptions[parseTheme] || defaultTheme;

paramMinutes = paramMinutes < 1 || paramMinutes > 60 ? 50 : paramMinutes;
paramBreak = paramBreak < 1 || paramBreak > 60 ? defaultBreak : paramBreak;
paramSets = paramSets < 1 || paramSets > 10 ? defaultSets : paramSets;

export { paramMinutes, paramBreak, paramSets, paramTheme };

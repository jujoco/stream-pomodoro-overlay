const url = document.location.search;
const searchParams = new URLSearchParams(url);
const defaultMinutes = 50;
const defaultBreak = 10;
const defaultSets = 3;

/** @type {number} paramMinutes */
let paramMinutes = parseInt(searchParams.get("focus")) || defaultMinutes; // default minutes

/** @type {number} paramBreak */
let paramBreak = parseInt(searchParams.get("break")) || defaultBreak; // default minutes

/** @type {number} paramSets */
let paramSets = parseInt(searchParams.get("sets")) || defaultSets; // default sets

paramMinutes = paramMinutes < 1 || paramMinutes > 60 ? 50 : paramMinutes;
paramBreak = paramBreak < 1 || paramBreak > 60 ? defaultBreak : paramBreak;
paramSets = paramSets < 1 || paramSets > 10 ? defaultSets : paramSets;

export { paramMinutes, paramBreak, paramSets };

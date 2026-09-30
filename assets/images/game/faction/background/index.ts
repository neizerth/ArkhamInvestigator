import type { FactionImages } from "@shared/model";

export const guardian = require("./guardian.webp");
export const mystic = require("./mystic.webp");
export const rogue = require("./rogue.webp");
export const seeker = require("./seeker.webp");
export const survivor = require("./survivor.webp");
export const neutral = require("./neutral.webp");

export const defaultFactionBackgroundImage = require("./default.webp");

export const factionBackgroundImages: FactionImages = {
	guardian,
	mystic,
	rogue,
	seeker,
	survivor,
	neutral,
};

export default [guardian, mystic, rogue, seeker, survivor, neutral];

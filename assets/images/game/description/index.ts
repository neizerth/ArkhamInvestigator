import type { FactionImages } from "@shared/model";

const guardian = require("./guardian.webp");
const mystic = require("./mystic.webp");
const rogue = require("./rogue.webp");
const seeker = require("./seeker.webp");
const survivor = require("./survivor.webp");
const neutral = require("./neutral.webp");

export const defaultFactionDescriptionImage = require("./default.webp");

export const descriptionImages: FactionImages = {
	guardian,
	mystic,
	rogue,
	seeker,
	survivor,
	neutral,
};

export default [guardian, mystic, rogue, seeker, survivor, neutral];

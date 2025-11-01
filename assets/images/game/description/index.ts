import type { FactionImages } from "@shared/model";

const guardian = require("./guardian.png");
const mystic = require("./mystic.png");
const rogue = require("./rogue.png");
const seeker = require("./seeker.png");
const survivor = require("./survivor.png");
const neutral = require("./neutral.png");

export const defaultFactionDescriptionImage = require("./default.png");

export const descriptionImages: FactionImages = {
	guardian,
	mystic,
	rogue,
	seeker,
	survivor,
	neutral,
};

export default [guardian, mystic, rogue, seeker, survivor, neutral];

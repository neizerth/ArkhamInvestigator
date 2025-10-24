import type { FactionImages } from "@shared/model";

const guardian = require("./guardian.png");
const mystic = require("./mystic.png");
const rogue = require("./rogue.png");
const seeker = require("./seeker.png");
const survivor = require("./survivor.png");
const neutral = require("./neutral.png");

const guardianParallel = require("./guardian_parallel.png");
const mysticParallel = require("./mystic_parallel.png");
const rogueParallel = require("./rogue_parallel.png");
const seekerParallel = require("./seeker_parallel.png");
const survivorParallel = require("./survivor_parallel.png");
const neutralParallel = require("./neutral_parallel.png");

export const defaultTitleImage = require("./default.png");

const defaultImages: FactionImages = {
	guardian,
	mystic,
	rogue,
	seeker,
	survivor,
	neutral,
};

const parallelImages: FactionImages = {
	guardian: guardianParallel,
	mystic: mysticParallel,
	rogue: rogueParallel,
	seeker: seekerParallel,
	survivor: survivorParallel,
	neutral: neutralParallel,
};

export const titleImages = {
	default: defaultImages,
	parallel: parallelImages,
};

export default [
	guardian,
	mystic,
	rogue,
	seeker,
	survivor,
	neutral,
	guardianParallel,
	mysticParallel,
	rogueParallel,
	seekerParallel,
	survivorParallel,
	neutralParallel,
];

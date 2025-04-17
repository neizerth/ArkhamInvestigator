import type { Faction } from "@shared/model";
import type { ImageRequireSource } from "react-native";

const guardian = require("./guardian.png");
const mystic = require("./mystic.png");
const rogue = require("./rogue.png");
const seeker = require("./seeker.png");
const survivor = require("./survivor.png");

export const factionIconImages: Partial<Record<Faction, ImageRequireSource>> = {
	guardian,
	mystic,
	rogue,
	seeker,
	survivor,
};

export default [guardian, mystic, rogue, seeker, survivor];

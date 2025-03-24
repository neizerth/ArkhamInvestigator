import { settings } from "@shared/lib";
import type { Href } from "expo-router";
import { identity } from "ramda";

const r = identity<Href>;

export const routes = {
	home: r("/"),
	settings: r("/settings"),

	selectInvestigators: r("/select-investigators"),
	selectInvestigatorDetails: r("/select-investigators/details"),

	board: r("/board"),
	skillCheck: r("/board/skill-check"),
	boardHelp: r("/board/help"),

	about: r("/static/about"),
	support: r("/static/support"),
};

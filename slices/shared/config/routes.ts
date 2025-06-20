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
	replaceInvestigator: r("/board/replace-investigator"),
	overview: r("/board/overview"),
	roundReference: r("/board/round-reference"),

	chaosBag: r("/chaos-bag"),
	chaosBagPreview: r("/chaos-bag/preview"),
	chaosBagHistory: r("/chaos-bag/history"),
	chaosBagFill: r("/chaos-bag/fill"),
	chaosBagReferenceEdit: r("/chaos-bag/reference/edit"),
	chaosBagReferenceView: r("/chaos-bag/reference"),

	about: r("/static/about"),
	support: r("/static/support"),
};

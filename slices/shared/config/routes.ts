import type { Href } from "expo-router";
import { identity } from "ramda";

const r = identity<Href>;

export const routes = {
	home: r("/"),
	settings: r("/settings"),

	selectInvestigators: r("/select-investigators"),
	selectInvestigatorDetails: r("/(modal)/select-investigator-details"),

	board: r("/board"),
	boardHelp: r("/board/help"),
	skillCheck: r("/board/skill-check"),
	replaceInvestigator: r("/board/replace-investigator"),
	overview: r("/(modal)/board/overview"),
	roundReference: r("/(modal)/board/round-reference"),

	chaosBag: r("/chaos-bag"),
	chaosBagPreview: r("/(modal)/chaos-bag/preview"),
	chaosBagHistory: r("/chaos-bag/history"),
	chaosBagFill: r("/(modal)/chaos-bag/fill"),
	chaosBagReferenceEdit: r("/(modal)/chaos-bag/reference/edit"),
	chaosBagReferenceView: r("/(modal)/chaos-bag/reference"),

	about: r("/static/about"),
	support: r("/static/support"),
};

import type { SkillType } from "@shared/model";

type SkillColors = {
	dark: string;
	light: string;
};
export const skillColors: Record<SkillType, SkillColors> = {
	willpower: {
		dark: "#217CC8",
		light: "#165385",
	},
	intellect: {
		dark: "#B743A2",
		light: "#7A2D6C",
	},
	combat: {
		dark: "#D3242D",
		light: "#8D181E",
	},
	agility: {
		dark: "#139C1D",
		light: "#0D6813",
	},
	wild: {
		dark: "#217CC8",
		light: "#635120",
	},
};

export const color = {
	black: "#000",
	white: "#fff",

	light10: "#D7D3C6",
	light15: "#E6E1D3",
	light20: "#F5F0E1",
	light30: "#FFFBF2",

	gray10: "#B0B4B1",
	gray20: "#9AA0A0",
	gray30: "#7E8588",
	gray40: "#60676C",

	dark10: "#656C6F",
	dark15: "#4F5A60",
	dark20: "#475259",
	dark30: "#24303C",
	dark40: "#171e26",

	fight: "#EE4A53",
	evade: "#48B14F",
	taboo: "#9869f5",
	health: "#c71f23",
	sanity: "#1c3e6a",
	resource: "#452e26",
	clue: "#486527",
	handSize: "#6c8083",
	doom: {
		light: "#ff0a1a",
		dark: "#c50814",
	},
	action: "#24303C",
	text: "#2e2622",

	status: {
		success: "#314629",
		error: "#552D2D",
		warn: "#C50707",
		warnText: "#FB4135",
	},
	token: {
		skull: "#915c5c",
		cultist: "#669154",
		tablet: "#548994",
		elder_thing: "#a661ab",
		auto_fail: "#bf2128",
		elder_sign: "#5496cc",
		bless: "#ebaa42",
		curse: "#b069c9",
		frost: "#6559f7",
	},
	ffg: {
		light: "#6498D5",
		dark: "#275891",
	},

	skill: skillColors,
	modal: {
		background: {
			light: "rgba(0, 0, 0, 0.5)",
			dark: "rgba(0, 0, 0, 0.8)",
		},
	},
	title: "#6d251f",
	rulesText: "#2c2e35",
};

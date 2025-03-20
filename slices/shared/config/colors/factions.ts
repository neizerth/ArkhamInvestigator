import type { Faction } from "@shared/model";
import { color } from "./color";

export type FactionColor = {
	darkColor: string;
	lightColor: string;

	background: string;
	darkBackground: string;
	lightBackground: string;

	border: string;
};

export const factionColor: Record<Faction, FactionColor> = {
	guardian: {
		darkColor: "#5CB4FD",
		lightColor: "#1072C2",

		background: "#1072C2",
		darkBackground: "#2b80c5",
		lightBackground: "#d5e6f3",

		border: "#5CB4FD",
	},
	seeker: {
		darkColor: "#EFA345",
		lightColor: "#DB7C07",

		background: "",
		darkBackground: "#db7c07",
		lightBackground: "#fbe6d4",

		border: "#EFA345",
	},
	rogue: {
		darkColor: "#48B14F",
		lightColor: "#219428",

		background: "#219428",
		darkBackground: "#107116",
		lightBackground: "#015906",

		border: "#48B14F",
	},
	mystic: {
		darkColor: "#BA81F2",
		lightColor: "#7554AB",

		background: "#7554AB",
		darkBackground: "#7554AB",
		lightBackground: "#46018f",

		border: "#BA81F2",
	},
	survivor: {
		darkColor: "#EE4A53",
		lightColor: "#CC3038",

		background: "#CC3038",
		darkBackground: "#cc3038",
		lightBackground: "#7a0105",

		border: "#EE4A53",
	},
	neutral: {
		darkColor: color.light10,
		lightColor: color.dark20,

		background: color.dark20,
		darkBackground: "#444444",
		lightBackground: "#292929",

		border: "#9B9B9B",
	},
};

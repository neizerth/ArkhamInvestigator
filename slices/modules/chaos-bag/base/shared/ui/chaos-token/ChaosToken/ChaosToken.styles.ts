import { arrayIf, snakeCase } from "@shared/lib";
import type {
	BaseSymbolicChaosTokenType,
	BlessCurseChaosTokenType,
	ChaosTokenType,
} from "../../../model";
import type { ChaosTokenPartType } from "./ChaosToken.types";

type Options = {
	type: ChaosTokenType;
	modified: boolean;
	highlight: boolean;
};

type ChaosTokenPart = {
	type: ChaosTokenPartType;
	icon: string;
	color: string;
};

type Parts = ChaosTokenPart[];

const numericParts = ({ type, modified, highlight }: Options): Parts => {
	if (modified) {
		return [
			{ type: "overlay", icon: "token_sealed_outline", color: "#394852" },
		];
	}

	const highlightPart: ChaosTokenPart = {
		type: "highlight",
		icon: `token_${type}_highlight`,
		color: "#FFFBF2",
	};

	return [
		{ type: "fill", icon: "token_symbol_fill", color: "#394852" },
		{ type: "overlay", icon: "token_number_overlay", color: "#E6E1D3" },
		...arrayIf(highlight, highlightPart),
	];
};

const plusOneParts = ({ modified, highlight }: Options): Parts => {
	if (modified) {
		return [
			{ type: "overlay", icon: "token_sealed_outline", color: "#394852" },
		];
	}

	const highlightPart: ChaosTokenPart = {
		type: "highlight",
		icon: "token_1_highlight",
		color: "#FFFBF2",
	};

	return [
		{ type: "fill", icon: "token_symbol_fill", color: "#394852" },
		{ type: "overlay", icon: "token_number_overlay", color: "#ECBA59" },
		...arrayIf(highlight, highlightPart),
	];
};

const symbolFillColor = {
	skull: "#552D2D",
	cultist: "#314629",
	tablet: "#294146",
	elderThing: "#442946",
	autoFail: "#7D1318",
	elderSign: "#4477A1",
	bless: "#9D702A",
	curse: "#3A2342",
	moon: "#394852",
};

const baseSymbolicParts = (
	type: BaseSymbolicChaosTokenType | "moon",
): Parts => {
	const icon = snakeCase(type);
	const fillPrefix = type === "skull" ? "symbol" : icon;
	const fillColor = symbolFillColor[type];

	return [
		{ type: "fill", icon: `token_${fillPrefix}_fill`, color: fillColor },
		{ type: "overlay", icon: `token_${icon}_overlay`, color: "#E6E1D3" },
		{ type: "highlight", icon: `token_${icon}_highlight`, color: "#FFFBF2" },
	];
};

const blessCurseFillColor = {
	bless: "#9D702A",
	curse: "#35232F",
};

const blessCurseParts = (type: BlessCurseChaosTokenType): Parts => [
	{
		type: "fill",
		icon: `token_${type}_fill`,
		color: blessCurseFillColor[type],
	},
	{ type: "overlay", icon: `token_${type}_overlay`, color: "#E6E1D3" },
];

const autoFailParts: Parts = [
	{ type: "overlay", icon: "token_auto_fail_overlay", color: "#E6E1D3" },
	{ type: "highlight", icon: "token_auto_fail_highlight", color: "#8D181E" },
];

const elderSignParts: Parts = [
	{ type: "overlay", icon: "token_elder_sign_overlay", color: "#E6E1D3" },
	{ type: "fill", icon: "token_elder_sign_fill", color: "#427DAD" },
	{ type: "highlight", icon: "token_elder_sign_highlight", color: "#E6E1D3" },
];

const frostParts: Parts = [
	{ type: "fill", icon: "token_number_fill", color: "#3D3A63" },
	{ type: "overlay", icon: "token_frost_overlay", color: "#E6E1D3" },
	{ type: "highlight", icon: "token_frost_highlight", color: "#FFFBF2" },
];

const moonParts: Parts = [
	{ type: "fill", icon: "token_number_fill", color: "#3D3A63" },
	{ type: "overlay", icon: "token_moon_overlay", color: "#E6E1D3" },
	{ type: "highlight", icon: "token_moon_fill", color: "#FFFBF2" },
];

const specialParts = {
	autoFail: autoFailParts,
	elderSign: elderSignParts,
	frost: frostParts,
	moon: moonParts,
};

export const getChaosTokenParts = (options: Options) => {
	const { type } = options;
	switch (type) {
		case "custom":
			return [];
		case "+1":
			return plusOneParts(options);
		case "0":
		case "-1":
		case "-2":
		case "-3":
		case "-4":
		case "-5":
		case "-6":
		case "-7":
		case "-8":
			return numericParts(options);
		case "skull":
		case "cultist":
		case "tablet":
		case "elderThing":
			return baseSymbolicParts(type);
		case "bless":
		case "curse":
			return blessCurseParts(type);
		default:
			return specialParts[type];
	}
};

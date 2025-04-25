import { snakeCase } from "@shared/lib";
import type {
	BaseSymbolicChaosTokenType,
	BlessCurseChaosTokenType,
	ChaosTokenType,
} from "../../../../model";

type ChaosTokenPart = {
	icon: string;
	color: string;
};

type Parts = ChaosTokenPart[];

const numericParts = (type: ChaosTokenType): Parts => [
	{ icon: "token_symbol_fill", color: "#394852" },
	{ icon: "token_number_overlay", color: "#E6E1D3" },
	{ icon: `token_${type}_highlight`, color: "#FFFBF2" },
];

const plusOneParts: Parts = [
	{ icon: "token_symbol_fill", color: "#394852" },
	{ icon: "token_number_overlay", color: "#ECBA59" },
	{ icon: "token_1_highlight", color: "#FFFBF2" },
];

const symbolFillColor = {
	skull: "#552D2D",
	cultist: "#314629",
	tablet: "#294146",
	elderThing: "#442946",
	autoFail: "#7D1318",
	elderSign: "#4477A1",
	bless: "#9D702A",
	curse: "#3A2342",
};

const baseSymbolicParts = (type: BaseSymbolicChaosTokenType): Parts => {
	const icon = snakeCase(type);
	const fillPrefix = type === "skull" ? "symbol" : icon;
	const fillColor = symbolFillColor[type];

	return [
		{ icon: `token_${fillPrefix}_fill`, color: fillColor },
		{ icon: `token_${icon}_overlay`, color: "#E6E1D3" },
		{ icon: `token_${icon}_highlight`, color: "#FFFBF2" },
	];
};

const blessCurseFillColor = {
	bless: "#9D702A",
	curse: "#35232F",
};

const blessCurseParts = (type: BlessCurseChaosTokenType): Parts => [
	{ icon: `token_${type}_fill`, color: blessCurseFillColor[type] },
	{ icon: `token_${type}_overlay`, color: "#E6E1D3" },
];

const autoFailParts: Parts = [
	{ icon: "token_auto_fail_overlay", color: "#E6E1D3" },
	{ icon: "token_auto_fail_highlight", color: "#8D181E" },
];

const elderSignParts: Parts = [
	{ icon: "token_elder_sign_overlay", color: "#E6E1D3" },
	{ icon: "token_elder_sign_fill", color: "#427DAD" },
	{ icon: "token_elder_sign_highlight", color: "#E6E1D3" },
];

const frostParts: Parts = [
	{ icon: "token_number_fill", color: "#3D3A63" },
	{ icon: "token_frost_overlay", color: "#E6E1D3" },
	{ icon: "token_frost_highlight", color: "#FFFBF2" },
];

const specialParts = {
	"+1": plusOneParts,
	autoFail: autoFailParts,
	elderSign: elderSignParts,
	frost: frostParts,
};

export const getChaosTokenParts = (type: ChaosTokenType) => {
	switch (type) {
		case "0":
		case "-1":
		case "-2":
		case "-3":
		case "-4":
		case "-5":
		case "-6":
		case "-7":
		case "-8":
			return numericParts(type);
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

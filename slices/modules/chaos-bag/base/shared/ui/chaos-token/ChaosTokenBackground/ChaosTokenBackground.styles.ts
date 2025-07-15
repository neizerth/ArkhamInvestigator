import type { ChaosTokenType } from "../../../model";

type ChaosTokenGradientColorStop = {
	offset: string;
	color: string;
};

type ChaosTokenGradient = ChaosTokenGradientColorStop[];

const defaultLightGradient: ChaosTokenGradient = [
	{ offset: "60%", color: "#FFFBF2" },
	{ offset: "100%", color: "#D6CFB9" },
];

const defaultDarkGradient: ChaosTokenGradient = [
	{ offset: "60%", color: "#FFFBF2" },
	{ offset: "100%", color: "#9c8b67" },
];

const gradients: Partial<Record<ChaosTokenType, ChaosTokenGradient>> = {
	frost: [
		{ offset: "66%", color: "#3D3A63" },
		{ offset: "100%", color: "#495483" },
	],
	autoFail: [
		{ offset: "75%", color: "#8D181E" },
		{ offset: "100%", color: "#6A0B10" },
	],
	elderSign: [
		{ offset: "0%", color: "#33A1FB" },
		{ offset: "50%", color: "#3C8AC9" },
		{ offset: "100%", color: "#457398" },
	],
	bless: [
		{ offset: "25%", color: "#9C702A" },
		{ offset: "100%", color: "#695823" },
	],
	curse: [
		{ offset: "25%", color: "#362330" },
		{ offset: "100%", color: "#3B224A" },
	],
};

export const getChaosTokenGradient = (type: ChaosTokenType, dark = false) => {
	const defaultGradient = dark ? defaultDarkGradient : defaultLightGradient;
	const stops = gradients[type] || defaultGradient;

	return stops.map((item) => ({
		...item,
		opacity: "1",
	}));
};

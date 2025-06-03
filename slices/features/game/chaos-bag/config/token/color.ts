import type { ChaosTokenType } from "../../model";

const chaosTokenTypeColor: Partial<Record<ChaosTokenType, string>> = {
	frost: "#2F3649",
	tablet: "#294146",
	elderThing: "#442946",
	skull: "#661e09",
	cultist: "#00543a",
};

export const chaosTokenColor = {
	background: "#D6CFB9",
	selected: "#D4AF37",
	types: chaosTokenTypeColor,
};

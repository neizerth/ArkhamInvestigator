import type { ChaosTokenType } from "../../model";

const chaosTokenTypeColor: Partial<Record<ChaosTokenType, string>> = {
	frost: "#2F3649",
	tablet: "#294146",
	elderThing: "#442946",
	elderSign: "#4477A1",
	skull: "#661e09",
	cultist: "#314629",
	autoFail: "#7D1318",
	curse: "#3B224A",
	bless: "#695823",
};

export const chaosTokenColor = {
	background: "#D6CFB9",
	selected: "#D4AF37",
	types: chaosTokenTypeColor,
};

import { DEFAULT_HAND_SIZE, InvesigatorCode } from "@shared/config";

export const getBaseHandSize = (code: string) => {
	if (code === InvesigatorCode.PatriceHathaway) {
		return DEFAULT_HAND_SIZE - 3;
	}
};

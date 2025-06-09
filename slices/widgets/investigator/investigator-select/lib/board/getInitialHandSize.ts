import { DEFAULT_HAND_SIZE, InvesigatorCode } from "@shared/config";

export const getInitialHandSize = (code: string) => {
	if (code === InvesigatorCode.GeorgeBarnaby) {
		return 0;
	}
	return DEFAULT_HAND_SIZE;
};

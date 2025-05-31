import {
	DEFAULT_UPKEEP_RESOURCES_INCREASE,
	InvesigatorCode,
} from "@shared/config";

export const getDefaultUpkeepResourceincrease = (code: string) => {
	if (code === InvesigatorCode.JennyBarnes) {
		return DEFAULT_UPKEEP_RESOURCES_INCREASE + 1;
	}
	return DEFAULT_UPKEEP_RESOURCES_INCREASE;
};

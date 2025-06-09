import {
	DEFAULT_UPKEEP_RESOURCES_INCREASE,
	InvesigatorCode,
} from "@shared/config";

const JennyCodes = [
	InvesigatorCode.JennyBarnes.base,
	InvesigatorCode.JennyBarnes.book,
];
export const getDefaultUpkeepResourceIncrease = (code: string) => {
	if (JennyCodes.includes(code)) {
		return DEFAULT_UPKEEP_RESOURCES_INCREASE + 1;
	}
	return DEFAULT_UPKEEP_RESOURCES_INCREASE;
};

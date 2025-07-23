import { chaosToken } from "../../../config";

export const getChaosTokenModificationColor = (value: number) => {
	return value > 0 ? chaosToken.color.selected : chaosToken.color.default;
};

export const getChaosTokenModificationValueColor = (value: number) => {
	return value > 0 ? chaosToken.color.default : chaosToken.color.value.numeric;
};

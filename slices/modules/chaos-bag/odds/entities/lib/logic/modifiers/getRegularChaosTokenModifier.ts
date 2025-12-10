import type { ChaosBagOddsToken } from "../../../model";

export const getRegularChaosTokenModifier = ({
	value = 0,
}: ChaosBagOddsToken) => {
	if (value === "fail") {
		return Number.NEGATIVE_INFINITY;
	}
	if (value === "success") {
		return Number.POSITIVE_INFINITY;
	}

	return value;
};

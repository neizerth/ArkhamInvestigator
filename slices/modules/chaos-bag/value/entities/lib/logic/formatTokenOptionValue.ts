import { signedNumber } from "@shared/lib";
import type { ArkhamCardsChaosOddTokenValueType } from "arkham-investigator-data/build/src/api/arkhamCards";

export const formatTokenOptionValue = (
	value: ArkhamCardsChaosOddTokenValueType,
) => {
	if (value === "auto_fail") {
		return "[auto_fail]";
	}
	if (value === "auto_succeed") {
		return "[check-fill]";
	}

	return signedNumber(value, "+");
};

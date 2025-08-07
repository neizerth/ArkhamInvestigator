import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import type { ArkhamCardsChaosOddTokenValueType as Value } from "arkham-investigator-data/build/src/api/arkhamCards";

export const formatRangeValue = (value: Value): ChaosTokenValue => {
	switch (value) {
		case "auto_fail": {
			return "fail";
		}
		case "auto_succeed": {
			return "success";
		}
		default:
			return value;
	}
};

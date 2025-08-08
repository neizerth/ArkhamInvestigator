import { signedNumber } from "@shared/lib/util";
import type { ChaosTokenValue } from "../../model";

export const getChaosTokenValueSymbol = (value: ChaosTokenValue) => {
	switch (value) {
		case "fail": {
			return "[auto_fail]";
		}
		case "success": {
			return "[check]";
		}
		default:
			return signedNumber(value, "+");
	}
};

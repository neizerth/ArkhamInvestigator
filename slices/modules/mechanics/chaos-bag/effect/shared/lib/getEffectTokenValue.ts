import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

export const getEffectTokenValue = (value: ChaosTokenValue) => {
	switch (value) {
		case "fail": {
			return "[auto_fail]";
		}
		case "success": {
			return "[check]";
		}
		default:
			return value;
	}
};

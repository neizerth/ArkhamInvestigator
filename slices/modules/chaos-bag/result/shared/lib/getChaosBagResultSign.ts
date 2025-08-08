import type { ChaosTokenValue } from "../../../value/shared/model";

export const getChaosBagResultSign = (result: ChaosTokenValue | null) => {
	switch (result) {
		case "fail": {
			return "-";
		}
		case "success": {
			return "+";
		}
	}
};

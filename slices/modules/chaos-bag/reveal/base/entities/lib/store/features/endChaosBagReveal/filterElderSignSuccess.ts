import { isRevealedTokenActive } from "@modules/chaos-bag/result/shared/lib";
import { propEq } from "ramda";
import { chaosBagRevealEnd } from "./endChaosBagReveal";

export const filterElderSignSuccess =
	(status: "fail" | "success" | "not-success" | "unknown") =>
	(action: unknown) => {
		if (!chaosBagRevealEnd.match(action)) {
			return false;
		}

		const { payload } = action;

		if (status === "fail" && payload.failed !== true) {
			return false;
		}

		if (status === "success" && payload.failed !== false) {
			return false;
		}

		if (status === "not-success" && payload.failed === false) {
			return false;
		}

		if (status === "unknown" && payload.failed !== null) {
			return false;
		}

		const { skillCheckBoardId, allRevealedTokens } = payload;

		const haveElderSign = allRevealedTokens
			.filter(isRevealedTokenActive)
			.some(propEq("elderSign", "type"));

		return Boolean(skillCheckBoardId) && haveElderSign;
	};

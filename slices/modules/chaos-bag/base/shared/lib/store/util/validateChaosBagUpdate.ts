import moment from "moment";
import type { ChaosBagState } from "../chaosBag";

export const validateChaosBagUpdate = (
	state: ChaosBagState,
	lastUpdatedAt: string,
): boolean => {
	const isValid = moment(lastUpdatedAt).isSameOrAfter(
		moment(state.chaosBagUpdatedAt),
	);
	if (!isValid) {
		console.log(
			"chaos bag update is not valid",
			lastUpdatedAt,
			state.chaosBagUpdatedAt,
		);
	}
	return isValid;
};

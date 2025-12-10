import type { ChaosBagOddsToken } from "../../../model";

export const getChaosOddsGroupId = (token: ChaosBagOddsToken) => {
	const { type, revealCount, value = 0 } = token;
	return `${type}-${revealCount}-${value}`;
};

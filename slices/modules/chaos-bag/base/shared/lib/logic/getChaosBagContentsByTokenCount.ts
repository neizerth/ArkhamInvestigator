import { repeat } from "ramda";
import { chaosToken } from "../../config";
import type { ChaosTokenCount } from "../../model";
import { createChaosBagToken } from "./createChaosBagToken";
import { getChaosTokenCountByType } from "./getChaosTokenCountByType";

export const getChaosBagContentsByTokenCount = (
	tokenCount: ChaosTokenCount,
) => {
	return chaosToken.types.all
		.flatMap((type) => {
			const count = getChaosTokenCountByType({
				tokenCount,
				type,
			});
			return repeat(type, count);
		})
		.map((type) =>
			createChaosBagToken({
				type,
			}),
		);
};

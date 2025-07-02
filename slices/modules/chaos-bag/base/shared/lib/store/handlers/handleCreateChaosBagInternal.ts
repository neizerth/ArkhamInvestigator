import { repeat } from "ramda";
import { chaosToken } from "../../../config";
import type { ChaosTokenCount } from "../../../model";
import type { ChaosBagHandler } from "../../../model";
import { createChaosBagToken, getChaosTokenCountByType } from "../../features";

export type HandleCreateChaosBagInternalPayload = {
	tokenCount: ChaosTokenCount;
};

export const handleCreateChaosBagInternal: ChaosBagHandler<
	HandleCreateChaosBagInternalPayload
> = (state, { tokenCount }) => {
	const contents = chaosToken.types.all
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

	state.contents = contents;
	state.tokenCount = tokenCount;
};

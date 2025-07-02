import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { v4 } from "uuid";

export type CreateChaosBagTokenData = Omit<ChaosBagToken, "id">;

export const createChaosBagToken = (
	data: CreateChaosBagTokenData,
): ChaosBagToken => ({
	...data,
	id: v4(),
});

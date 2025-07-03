import type {
	ChaosBagToken,
	ChaosBagTokenData,
} from "@modules/chaos-bag/base/shared/model";
import { v4 } from "uuid";

export const createChaosBagToken = (
	data: ChaosBagTokenData,
): ChaosBagToken => ({
	...data,
	id: v4(),
});

import type {
	ChaosBagToken,
	ChaosBagTokenData,
} from "@modules/chaos-bag/base/shared/model";
import { v4 } from "uuid";

type Data = ChaosBagTokenData & {
	id?: string;
};

export const createChaosBagToken = (data: Data): ChaosBagToken => ({
	id: v4(),
	...data,
});

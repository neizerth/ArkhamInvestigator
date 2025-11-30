import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenListItem } from "./ChaosTokenList.types";

const data: ChaosTokenType[] = [...chaosToken.types.base, "frost", "moon"];

export const chaosTokenListData: ChaosTokenListItem[] = [
	{
		type: "blessCurse",
	},
	...data.map(
		(value): ChaosTokenListItem => ({
			type: "token",
			value,
		}),
	),
];

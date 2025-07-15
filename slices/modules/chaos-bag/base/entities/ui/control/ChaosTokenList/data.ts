import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import type { ChaosTokenListItem } from "./ChaosTokenList.types";

export const chaosTokenListData: ChaosTokenListItem[] = [
	{
		type: "blessCurse",
	},
	...chaosToken.types.regular.map(
		(value): ChaosTokenListItem => ({
			type: "token",
			value,
		}),
	),
];

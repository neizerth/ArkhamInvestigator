import { chaosToken } from "../../../config";
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

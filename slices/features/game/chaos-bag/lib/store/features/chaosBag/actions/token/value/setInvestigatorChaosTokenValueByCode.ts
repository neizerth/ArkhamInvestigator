import type { AppThunk } from "@shared/model";
import type { ChaosTokenType } from "../../../../../../../model";
import {
	selectBoardChaosTokenValue,
	setBoardChaosTokenValue,
} from "../../../chaosBag";

type Options = {
	code: string;
	value: number;
	type: ChaosTokenType;
};
export const setInvestigatorChaosTokenValueByCode =
	({ code, value, type }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const data = selectBoardChaosTokenValue(state) || {};

		const investigatorData = data[code] || {};

		const nextData = {
			...data,
			[code]: {
				...investigatorData,
				[type]: value,
			},
		};

		dispatch(setBoardChaosTokenValue(nextData));
	};

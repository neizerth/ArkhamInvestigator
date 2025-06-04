import type { AppThunk } from "@shared/model";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosTokenValue, setChaosTokenValue } from "../../chaosBag";

type Options = {
	type: ChaosTokenType;
	value: number;
};
export const setChaosTokenValueByType =
	({ type, value }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const data = selectChaosTokenValue(state) || {};

		dispatch(
			setChaosTokenValue({
				...data,
				[type]: value,
			}),
		);
	};

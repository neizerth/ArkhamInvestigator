import type { AppThunk } from "@shared/model";
import type { ChaosTokenType } from "../../../../../../model";
import {
	selectScenarioChaosTokenValue,
	setScenarioChaosTokenValue,
} from "../../chaosBag";

type Options = {
	type: ChaosTokenType;
	value: number;
};
export const setScenarioChaosTokenValueByType =
	({ type, value }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const data = selectScenarioChaosTokenValue(state) || {};

		dispatch(
			setScenarioChaosTokenValue({
				...data,
				[type]: value,
			}),
		);
	};

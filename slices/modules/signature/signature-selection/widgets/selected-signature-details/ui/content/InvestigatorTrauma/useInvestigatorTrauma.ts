import {
	selectSignatureSettingsProp,
	setInvestigatorSettingsProp,
} from "@modules/signature/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";

type TraumaType = "physicalTrauma" | "mentalTrauma";

type Options = {
	prop: TraumaType;
	code: string;
};

export const useInvestigatorTrauma = ({ code, prop }: Options) => {
	const dispatch = useAppDispatch();
	const defaultValue = useAppSelector(
		selectSignatureSettingsProp({
			prop,
			code,
		}),
	);
	const value = defaultValue ?? 0;

	const increment = useCallback(() => {
		dispatch(
			setInvestigatorSettingsProp({
				code,
				prop,
				value: value + 1,
			}),
		);
	}, [dispatch, code, value, prop]);

	const decrement = useCallback(() => {
		dispatch(
			setInvestigatorSettingsProp({
				code,
				prop,
				value: Math.max(0, value - 1),
			}),
		);
	}, [dispatch, code, value, prop]);

	return {
		value,
		increment,
		decrement,
	};
};

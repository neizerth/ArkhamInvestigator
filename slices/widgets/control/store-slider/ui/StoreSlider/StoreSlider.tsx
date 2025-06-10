import type { HapticSliderProps } from "@modules/core/haptic/shared/ui";
import { useAppTranslation } from "@modules/i18n/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { AppActionCreator, RootState } from "@shared/model";
import { useCallback } from "react";
import type { Selector } from "react-redux";
import * as C from "./StoreSlider.components";

export type StoreSliderProps = HapticSliderProps & {
	selector: Selector<RootState, number>;
	actionCreator: AppActionCreator<number>;
	translate?: boolean;
	label?: string;
};

export const StoreSlider = ({
	selector,
	label: labelProp = "",
	translate = true,
	onSlidingComplete: onSlidingCompleteProp,
	actionCreator,
	...props
}: StoreSliderProps) => {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const value = useAppSelector(selector);

	const label = translate ? t(labelProp) : labelProp;

	const onSlidingComplete = useCallback(
		(value: number) => {
			onSlidingCompleteProp?.(value);
			dispatch(actionCreator(value));
		},
		[dispatch, onSlidingCompleteProp, actionCreator],
	);

	return (
		<C.Container>
			<C.Label>{label}</C.Label>
			<C.Slider
				{...props}
				value={value}
				onSlidingComplete={onSlidingComplete}
			/>
		</C.Container>
	);
};

import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { AppActionCreator, RootState } from "@shared/model";
import type { SliderProps } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Selector } from "react-redux";
import * as C from "./StoreSlider.components";

export type StoreSliderProps = SliderProps & {
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
	const { t } = useTranslation();
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

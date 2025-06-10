import {
	HapticCheckbox,
	type HapticCheckboxProps,
} from "@modules/haptic/widgets";
import { useAppTranslation } from "@modules/i18n/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { AppActionCreator, RootState } from "@shared/model";
import { useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { Selector } from "react-redux";

export type StoreCheckboxProps = HapticCheckboxProps & {
	selector: Selector<RootState, boolean>;
	actionCreator: AppActionCreator<boolean>;
	translate?: boolean;
};

export function StoreCheckbox<T>({
	selector,
	actionCreator,
	translate = true,
	hint: hintProp,
	onPress: onPressProp,
	label: labelProp,
	...props
}: StoreCheckboxProps) {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const checked = useAppSelector(selector);
	const label = translate ? t(labelProp || "") : labelProp;
	const hint = translate ? t(hintProp || "") : hintProp;

	const onPress = useCallback(
		(e: GestureResponderEvent) => {
			onPressProp?.(e);
			dispatch(actionCreator(!checked));
		},
		[dispatch, onPressProp, checked, actionCreator],
	);

	return (
		<HapticCheckbox
			{...props}
			hint={hint}
			label={label}
			checked={checked}
			onPress={onPress}
		/>
	);
}

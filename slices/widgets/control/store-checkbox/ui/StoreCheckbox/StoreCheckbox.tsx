import { Checkbox, type CheckboxProps } from "@features/haptic";
import { useAppTranslation } from "@features/i18n";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { AppActionCreator, RootState } from "@shared/model";
import { useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { Selector } from "react-redux";

export type StoreCheckboxProps = CheckboxProps & {
	selector: Selector<RootState, boolean>;
	actionCreator: AppActionCreator<boolean>;
	translate?: boolean;
};

export function StoreCheckbox<T>({
	selector,
	actionCreator,
	translate = true,
	onPress: onPressProp,
	...props
}: StoreCheckboxProps) {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const checked = useAppSelector(selector);
	const label = translate ? t(props.label || "") : props.label;

	const onPress = useCallback(
		(e: GestureResponderEvent) => {
			onPressProp?.(e);
			dispatch(actionCreator(!checked));
		},
		[dispatch, onPressProp, checked, actionCreator],
	);

	return (
		<Checkbox {...props} label={label} checked={checked} onPress={onPress} />
	);
}

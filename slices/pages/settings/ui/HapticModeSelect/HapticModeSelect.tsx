import {
	defaultModeFeedback,
	selectHapticMode,
	setHapticMode,
	useHapticFeedback,
} from "@features/haptic";
import { useAppTranslation } from "@features/i18n";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { HapticMode } from "@shared/model";
import { Select, type SelectItem } from "@shared/ui";
import { propEq } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./HapticModeSelect.components";

export type HapticModeSelectProps = ViewProps;

type Item = SelectItem<HapticMode>;

export const HapticModeSelect = (props: HapticModeSelectProps) => {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const mode = useAppSelector(selectHapticMode);

	const data: Item[] = [
		{
			label: t`Default`,
			value: "default",
		},
		{
			label: t`System (if available)`,
			value: "system",
		},
		{
			label: t`No`,
			value: false,
		},
	];

	const impactFeedback = useHapticFeedback();

	const onChange = useCallback(
		({ value }: SelectItem<HapticMode>) => {
			dispatch(setHapticMode(value));
			if (value) {
				const feedback = defaultModeFeedback[value];
				impactFeedback(feedback, true);
			}
		},
		[dispatch, impactFeedback],
	);

	const value = data.find(propEq(mode, "value"));
	return (
		<C.Container {...props}>
			<C.Picker data={data} value={value} onChange={onChange} />
		</C.Container>
	);
};

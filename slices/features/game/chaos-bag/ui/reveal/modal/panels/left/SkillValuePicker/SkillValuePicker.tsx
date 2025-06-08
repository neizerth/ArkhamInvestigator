import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
} from "../../../../../../../../../widgets/control/picker";
import {
	selectChaosBagSkillValue,
	updateChaosBagSkillValue,
} from "../../../../../../lib";
import * as C from "./SkillValuePicker.components";

export type SkillValuePickerProps = ViewProps;

export const SkillValuePicker = (props: SkillValuePickerProps) => {
	const dispatch = useAppDispatch();
	const skillValue = useAppSelector(selectChaosBagSkillValue);

	const data = useMemo(() => {
		const max = Math.max(skillValue || 0, 100);
		return range(0, max + 1);
	}, [skillValue]);

	const renderSkillValue: PickerListRenderItem = useCallback(({ item }) => {
		return <C.SkillValueItem value={item} />;
	}, []);

	const onSkillValueChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(updateChaosBagSkillValue(value));
		},
		[dispatch],
	);

	if (typeof skillValue !== "number") {
		return;
	}

	return (
		<C.ValuePicker
			{...props}
			data={data}
			value={skillValue}
			renderItem={renderSkillValue}
			onValueChanged={onSkillValueChange}
		/>
	);
};

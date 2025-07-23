import { useAppDispatch, useAppSelector } from "@shared/lib";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
} from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";

import { setCustomChaosBagSkillValue } from "@modules/chaos-bag/base/entities/lib";
import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { color } from "@shared/config";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import * as C from "./SkillValuePicker.components";

export type SkillValuePickerProps = ViewProps;

const colors: Partial<
	Record<
		InvestigatorBoardNumericStat,
		{
			light: string;
		}
	>
> = color.skill;

export const SkillValuePicker = (props: SkillValuePickerProps) => {
	const dispatch = useAppDispatch();
	const skillValue = useAppSelector(selectChaosBagSkillValue);
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	const data = useMemo(() => {
		const max = Math.max(skillValue || 0, 101);
		return range(0, max + 1);
	}, [skillValue]);

	const strokeStyle = useMemo(() => {
		if (!skillType) {
			return;
		}
		return {
			color: colors[skillType]?.light,
		};
	}, [skillType]);

	const renderSkillValue: PickerListRenderItem = useCallback(
		({ item }) => {
			return <C.SkillValueItem value={item} strokeStyle={strokeStyle} />;
		},
		[strokeStyle],
	);

	const onSkillValueChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setCustomChaosBagSkillValue({
					boardId: "current",
					value,
				}),
			);
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

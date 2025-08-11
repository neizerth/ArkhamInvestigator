import {
	setChaosBagRevealResult,
	setChaosBagSucceedBy,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppDispatch } from "@shared/lib";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
} from "@widgets/control/picker";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./SkillCheckResultPicker.components";
import type { SkillCheckPickerItem } from "./SkillCheckResultPicker.types";
import { useSkillCheckPickerData } from "./useSkillCheckPickerData";

export type SkillCheckResultPickerProps = ViewProps;

export const SkillCheckResultPicker = (props: SkillCheckResultPickerProps) => {
	const dispatch = useAppDispatch();
	const { data, value, succeedBy } = useSkillCheckPickerData();

	const renderItem: PickerListRenderItem<SkillCheckPickerItem> = useCallback(
		({ item }) => {
			const { succeedBy, type } = item;
			const fail = type === "fail";
			const value = succeedBy.toString();
			return (
				<C.Special>
					{type === "success" && <C.AutoSuccess type="elderSign" />}
					{type === "fail" && <C.AutoFail type="autoFail" />}
					{value !== null && <C.SpecialValue value={value} fail={fail} />}
				</C.Special>
			);
		},
		[],
	);

	const onChange = useCallback(
		(event: PickerChangeEvent<SkillCheckPickerItem>) => {
			if (!event.value) {
				return;
			}
			const { value, succeedBy } = event.value;

			dispatch(setChaosBagRevealResult(value));
			dispatch(setChaosBagSucceedBy(succeedBy));
		},
		[dispatch],
	);

	const item = data.find((item) => item.value === value);

	return (
		<C.Container {...props}>
			<C.Control
				data={data}
				renderItem={renderItem}
				value={item}
				onValueChanged={onChange}
			/>
		</C.Container>
	);
};

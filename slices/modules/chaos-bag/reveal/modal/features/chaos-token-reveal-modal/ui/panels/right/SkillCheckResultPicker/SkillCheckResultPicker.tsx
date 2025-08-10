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
	const { fail, data, value, succeedBy } = useSkillCheckPickerData();

	const renderItem: PickerListRenderItem<SkillCheckPickerItem> = useCallback(
		({ item }) => {
			const { label } = item;
			if (label === "success") {
				return <C.AutoSuccess type="elderSign" />;
			}
			if (label === "fail") {
				return <C.AutoFail type="autoFail" />;
			}
			return (
				<C.ValueContainer>
					<C.Value value={label} fail={fail} scale={false} />
				</C.ValueContainer>
			);
		},
		[fail],
	);

	const onChange = useCallback(
		(event: PickerChangeEvent<SkillCheckPickerItem>) => {
			if (!event.value) {
				return;
			}
			const { value } = event.value;
			const succeedByValue = typeof value === "number" ? succeedBy : null;

			dispatch(setChaosBagRevealResult(value));
			dispatch(setChaosBagSucceedBy(succeedByValue));
		},
		[dispatch, succeedBy],
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

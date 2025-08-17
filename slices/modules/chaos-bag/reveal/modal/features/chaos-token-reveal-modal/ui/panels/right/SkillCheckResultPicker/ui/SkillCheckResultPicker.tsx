import { setCustomChaosBagRevealResult } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppDispatch } from "@shared/lib";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
} from "@widgets/control/picker";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { useSkillCheckPickerData } from "../lib";
import type { SkillCheckPickerItem } from "../model";
import * as C from "./SkillCheckResultPicker.components";

export type SkillCheckResultPickerProps = ViewProps;

export const SkillCheckResultPicker = (props: SkillCheckResultPickerProps) => {
	const dispatch = useAppDispatch();
	const { data, value, failed } = useSkillCheckPickerData();

	const renderItem: PickerListRenderItem<SkillCheckPickerItem> = useCallback(
		({ item }) => {
			const { succeedBy, failed } = item;
			const value = Math.abs(succeedBy).toString();
			return (
				<C.Special>
					{!failed && <C.AutoSuccess type="elderSign" />}
					{failed && <C.AutoFail type="autoFail" />}
					<C.SpecialValue value={value} fail={failed} />
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
			const { value, succeedBy, failed } = event.value;

			dispatch(
				setCustomChaosBagRevealResult({
					failed,
					result: value,
					succeedBy,
				}),
			);
		},
		[dispatch],
	);

	const item = data.find(
		(item) => item.value === value && item.failed === failed,
	);

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

import type {
	PickerActivationProps,
	PickerAnimationProps,
	PickerBaseListProps,
	PickerBasePressProps,
	PickerPressProps,
	PickerRenderProps,
	PickerScrollProps,
} from "@widgets/picker/model";
import { memo } from "react";
import { PickerListGestures } from "../PickerListGestures";
import * as C from "./PickerList.components";
import { useScrollFeedback } from "./useScrollFeedback";

export type PickerListProps = PickerBaseListProps &
	PickerAnimationProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerPressProps &
	PickerRenderProps &
	PickerScrollProps;

export const PickerList = (props: PickerListProps) => {
	const { onPress, onDoublePress, onLongPress } = props;
	const scrollProps = useScrollFeedback(props);

	return (
		<PickerListGestures
			{...scrollProps}
			pressEnabled={Boolean(onPress)}
			doublePressEnabled={Boolean(onDoublePress)}
			longPressEnabled={Boolean(onLongPress)}
		>
			<C.List {...scrollProps} />
		</PickerListGestures>
	);
};

export const PickerListMemo = memo(PickerList);

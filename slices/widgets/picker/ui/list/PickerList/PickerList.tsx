import type {
	PickerActivationProps,
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
import { useValueChange } from "./useValueChange";

export type PickerListProps = PickerBaseListProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerPressProps &
	PickerRenderProps &
	PickerScrollProps;

export const PickerList = (props: PickerListProps) => {
	const valueProps = useValueChange(props);
	const feedbackProps = useScrollFeedback(valueProps);

	return (
		<PickerListGestures {...feedbackProps}>
			<C.List {...feedbackProps} />
		</PickerListGestures>
	);
};

export const PickerListMemo = memo(PickerList);

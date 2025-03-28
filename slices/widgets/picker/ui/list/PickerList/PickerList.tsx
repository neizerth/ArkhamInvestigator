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

export type PickerListProps = PickerBaseListProps &
	PickerActivationProps &
	PickerBasePressProps &
	PickerPressProps &
	PickerRenderProps &
	PickerScrollProps;

export const PickerList = ({
	scrollHapticPattern,
	...props
}: PickerListProps) => {
	const scrollProps = useScrollFeedback(props);

	return (
		<PickerListGestures {...scrollProps}>
			<C.List {...scrollProps} />
		</PickerListGestures>
	);
};

export const PickerListMemo = memo(PickerList);

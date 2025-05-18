import { memo } from "react";
import { PickerListGestures } from "../PickerListGestures";
import * as C from "./PickerList.components";
import type { PickerListProps } from "./PickerList.types";
import usePickerEffects from "./hooks";

export const PickerList = (props: PickerListProps) => {
	const { onPress, onDoublePress, onLongPress, onSwipeLeft, onSwipeRight } =
		props;
	const scrollProps = usePickerEffects(props);

	return (
		<PickerListGestures
			{...scrollProps}
			pressEnabled={Boolean(onPress)}
			doublePressEnabled={Boolean(onDoublePress)}
			longPressEnabled={Boolean(onLongPress)}
			swipeLeftEnabled={Boolean(onSwipeLeft)}
			swipeRightEnabled={Boolean(onSwipeRight)}
		>
			<C.List {...scrollProps} />
		</PickerListGestures>
	);
};

export const PickerListMemo = memo(PickerList);

import type { PickRequired } from "@shared/model";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { getValueIndex } from "../../../../lib";
import type { PickerProps } from "../../../../model";
import { usePressGestures, useSwipeGestures } from "../lib";
import * as C from "./StaticPicker.components";

export type StaticPickerProps<T> = PickRequired<
	PickerProps<T>,
	"renderItemContainer"
>;

const empty = () => {};
const emptySeparators = {
	highlight: empty,
	unhighlight: empty,
	updateProps: empty,
};

// export const StaticPicker = ({}: StaticPickerProps) => {
export function StaticPicker<T>(props: StaticPickerProps<T>) {
	const {
		renderItem,
		renderItemContainer,
		data,
		itemContainerStyle,
		itemHeight,
		style,
	} = props;

	const index = getValueIndex(props);
	const item = data[index];

	const containerProps = {
		itemContainerStyle,
		index,
		item,
		itemHeight,
		separators: emptySeparators,
		renderItem,
	};

	const swipeGestures = useSwipeGestures(props);
	const pressGestures = usePressGestures(props);
	const gesture = Gesture.Exclusive(...swipeGestures, ...pressGestures);

	return (
		<C.Container style={style}>
			<GestureDetector gesture={gesture}>
				{renderItemContainer(containerProps)}
			</GestureDetector>
		</C.Container>
	);
}

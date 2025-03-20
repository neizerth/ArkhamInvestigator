import type { PickerRenderContainer } from "@widgets/picker/model";
import * as C from "./PickerList.components";

export const defaultRenderItemContainer: PickerRenderContainer = ({
	renderItem,
	itemHeight,
	itemContainerStyle,
	...info
}) => {
	const { currentValue, item } = info;
	const selected = currentValue === item;

	const style = [
		itemContainerStyle,
		{
			height: itemHeight,
		},
	];
	return <C.ItemContainer style={style}>{renderItem?.(info)}</C.ItemContainer>;
};

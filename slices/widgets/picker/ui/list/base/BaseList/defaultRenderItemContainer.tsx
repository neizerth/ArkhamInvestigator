import type { PickerRenderProp } from "@widgets/picker/model";
import * as C from "./BaseList.components";

export const defaultRenderItemContainer: PickerRenderProp = ({
	renderItem,
	itemHeight,
	itemContainerStyle,
	...info
}) => {
	const style = [
		itemContainerStyle,
		{
			height: itemHeight,
		},
	];
	return <C.ItemContainer style={style}>{renderItem?.(info)}</C.ItemContainer>;
};

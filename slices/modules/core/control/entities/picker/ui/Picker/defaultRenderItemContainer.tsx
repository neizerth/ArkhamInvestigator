import type { PickerContainerInfo } from "../../model";
import * as C from "./Picker.components";

export function defaultRenderItemContainer<T>({
	renderItem,
	itemHeight,
	itemContainerStyle,
	...info
}: PickerContainerInfo<T>) {
	const style = [
		itemContainerStyle,
		{
			height: itemHeight,
		},
	];
	return <C.ItemContainer style={style}>{renderItem?.(info)}</C.ItemContainer>;
}

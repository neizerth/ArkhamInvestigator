import { memo } from "react";
import type { PickerProps } from "../../model";
import * as C from "./Picker.components";
import { defaultRenderItemContainer } from "./defaultRenderItemContainer";

export function Picker<T>({
	style,
	itemHeight = 24,
	gap = 0,
	listStyle,
	renderItemContainer = defaultRenderItemContainer,
	// displayType = "animated",
	displayType = "static",
	...props
}: PickerProps<T>) {
	const Component = displayType === "animated" ? C.List : C.Static;
	return (
		<C.Container style={style}>
			<Component
				{...props}
				style={listStyle}
				itemHeight={itemHeight + gap}
				renderItemContainer={renderItemContainer}
			/>
		</C.Container>
	);
}

export const PickerMemo = memo(Picker) as typeof Picker;

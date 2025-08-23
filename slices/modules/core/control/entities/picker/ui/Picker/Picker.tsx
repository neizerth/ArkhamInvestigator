import { memo } from "react";
import type { PickerProps } from "../../model";
import * as C from "./Picker.components";

export function Picker<T>({
	style,
	itemHeight = 24,
	gap = 0,
	listStyle,
	...props
}: PickerProps<T>) {
	return (
		<C.Container style={style}>
			<C.List {...props} style={listStyle} itemHeight={itemHeight + gap} />
		</C.Container>
	);
}

export const PickerMemo = memo(Picker) as typeof Picker;

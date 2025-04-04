import type { PickerProps } from "@widgets/control/picker/model";
import { memo } from "react";
import * as C from "./Picker.components";

export const Picker = ({
	style,
	itemHeight = 24,
	gap = 0,
	listStyle,
	...props
}: PickerProps) => {
	return (
		<C.Container style={style}>
			<C.List {...props} style={listStyle} itemHeight={itemHeight + gap} />
		</C.Container>
	);
};

export const PickerMemo = memo(Picker);

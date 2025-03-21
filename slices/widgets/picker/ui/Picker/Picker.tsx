import type { PickerProps } from "@widgets/picker/model";
import { memo, useRef } from "react";
import { PickerListMemo as PickerList } from "../PickerList";
import * as C from "./Picker.components";

export const Picker = ({
	style,
	itemHeight = 24,
	...props
}: PickerProps) => {
	return (
		<C.Container style={style}>
			<PickerList
				{...props}
				itemHeight={itemHeight}
			/>
		</C.Container>
	);
};

export const PickerMemo = memo(Picker);

import { selectPickerAnimation } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
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
	...props
}: PickerProps<T>) {
	const animated = useAppSelector(selectPickerAnimation);

	const Component = animated ? C.List : C.Static;

	return (
		<C.Container style={style}>
			<Component
				{...props}
				style={listStyle}
				itemHeight={itemHeight + gap}
				gap={gap}
				renderItemContainer={renderItemContainer}
			/>
		</C.Container>
	);
}

export const PickerMemo = memo(Picker) as typeof Picker;

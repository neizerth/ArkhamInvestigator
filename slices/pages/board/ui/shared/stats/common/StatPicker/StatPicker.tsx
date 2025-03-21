import type { PickerItemInfo, PickerProps } from "@widgets/picker";
import { FC, memo, useCallback } from "react";
import type { ValueProps } from "../Value";
import * as C from "./StatPicker.components";

export type StatPickerProps = Omit<PickerProps, "renderItem"> & {
	valueStyle?: ValueProps["style"]
	Component?: FC<ValueProps>
	signed?: boolean
};

export const StatPicker = ({ 
		valueStyle,
		Component = C.Value,
		signed,
		gap = 48,
		...props 
	}: StatPickerProps) => {
	const renderItem = useCallback(
		(props: PickerItemInfo) => {
			const { item } = props;
			const value = signed && item > 0 ? `+${item}` : item 
			return (
				<Component 
					{...props} 
					value={value} 
					style={valueStyle} 
				/>
			);
		},
		[valueStyle, Component, signed]
	);

	return (
		<C.Picker 
			{...props} 
			renderItem={renderItem}
			gap={gap}
		/>
	);
};

export const StatPickerMemo = memo(StatPicker);

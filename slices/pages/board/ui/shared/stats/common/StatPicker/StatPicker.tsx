import type { PickerItemInfo, PickerProps } from "@widgets/picker";
import { type FC, memo, useCallback } from "react";
import type { ValueProps } from "../Value";
import * as C from "./StatPicker.components";
import { defaultStyles } from "./StatPicker.styles";

export type StatPickerProps = Omit<PickerProps, "renderItem"> & {
	valueStyle?: ValueProps["style"];
	Component?: FC<ValueProps>;
	signed?: boolean;
};

export const StatPicker = ({
	valueStyle,
	Component = C.Value,
	signed,
	...props
}: StatPickerProps) => {
	const renderItem = useCallback(
		(props: PickerItemInfo) => {
			const { item } = props;
			const value = signed && item > 0 ? `+${item}` : item;
			return <Component {...props} value={value} style={valueStyle} />;
		},
		[valueStyle, Component, signed],
	);

	return <C.Picker {...defaultStyles} {...props} renderItem={renderItem} />;
};

export const StatPickerMemo = memo(StatPicker);

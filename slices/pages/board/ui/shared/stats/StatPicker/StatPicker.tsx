import type { PickerItemInfo, PickerProps } from "@widgets/picker";
import { memo, useCallback } from "react";
import type { ValueProps } from "../Value";
import * as C from "./StatPicker.components";

export type StatPickerProps = Omit<PickerProps, "renderItem"> & {
	valueStyle?: ValueProps["style"];
};

export const StatPicker = ({ valueStyle, ...props }: StatPickerProps) => {
	const renderItem = useCallback(
		(props: PickerItemInfo) => {
			const { item } = props;
			return <C.Value {...props} value={item} style={valueStyle} />;
		},
		[valueStyle],
	);

	return <C.Picker {...props} renderItem={renderItem} />;
};

export const StatPickerMemo = memo(StatPicker);

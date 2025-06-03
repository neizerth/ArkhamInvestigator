import { signedNumber } from "@shared/lib";
import type { ValueProps } from "@shared/ui";
import type { PickerItemInfo, PickerProps } from "@widgets/control/picker";
import { type FC, memo, useCallback } from "react";
import * as C from "./StatPicker.components";
import { defaultStyles } from "./StatPicker.styles";

export type StatPickerProps = Omit<PickerProps, "renderItem"> & {
	valueStyle?: ValueProps["style"];
	textStyle?: ValueProps["textStyle"];
	Component?: FC<ValueProps>;
	signed?: boolean;
	zeroSign?: string;
};

export const StatPicker = ({
	valueStyle,
	textStyle,
	Component = C.Value,
	signed,
	zeroSign = "",
	...props
}: StatPickerProps) => {
	const renderItem = useCallback(
		(props: PickerItemInfo) => {
			const { item } = props;

			const value = signed
				? item === 0
					? `${zeroSign}0`
					: signedNumber(item)
				: item;

			return (
				<Component
					{...props}
					value={value}
					style={valueStyle}
					textStyle={textStyle}
				/>
			);
		},
		[valueStyle, textStyle, Component, signed, zeroSign],
	);

	return <C.Picker {...defaultStyles} {...props} renderItem={renderItem} />;
};

export const StatPickerMemo = memo(StatPicker);

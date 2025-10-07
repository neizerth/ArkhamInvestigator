import type {
	PickerItemInfo,
	PickerProps,
} from "@modules/core/control/entities/picker/model";
import { signedNumber } from "@shared/lib";
import type { ValueProps } from "@shared/ui";
import { type FC, memo, useCallback } from "react";
import { BoardValue } from "../BoardValue";
import * as C from "./StatPicker.components";
import { defaultStyles } from "./StatPicker.styles";

export type StatPickerProps = Omit<PickerProps<number>, "renderItem"> & {
	valueStyle?: ValueProps["style"];
	textStyle?: ValueProps["textStyle"];
	Component?: FC<ValueProps>;
	signed?: boolean;
	zeroSign?: string;
};

export function StatPicker({
	valueStyle,
	textStyle,
	Component = BoardValue,
	signed,
	zeroSign = "",
	...props
}: StatPickerProps) {
	const renderItem = useCallback(
		(props: PickerItemInfo<number>) => {
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
}

export const StatPickerMemo = memo(StatPicker);

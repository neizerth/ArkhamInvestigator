import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { useCallback } from "react";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
	PickerProps,
} from "../../../../../../widgets/control/picker";
import {
	selectChaosTokenValueByType,
	setChaosTokenValueByType,
} from "../../../lib";
import type { ChaosTokenType } from "../../../model";
import type { ChaosTokenValueProps } from "../ChaosTokenValue";
import * as C from "./ChaosTokenValuePicker.components";

const data = range(-20, 21);

export type ChaosTokenValuePickerProps = Omit<
	PickerProps,
	"renderItem" | "data"
> & {
	valueStyle?: ChaosTokenValueProps["style"];
	type: ChaosTokenType;
};

export const ChaosTokenValuePicker = ({
	type,
	valueStyle,
	...props
}: ChaosTokenValuePickerProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectChaosTokenValueByType(type));

	const setValue = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setChaosTokenValueByType({
					type,
					value,
				}),
			);
		},
		[dispatch, type],
	);

	const renderItem: PickerListRenderItem = useCallback(
		({ item }) => {
			return <C.TokenValue value={item} type={type} style={valueStyle} />;
		},
		[type, valueStyle],
	);

	return (
		<C.Control
			{...props}
			data={data}
			renderItem={renderItem}
			value={value}
			onValueChanged={setValue}
		/>
	);
};

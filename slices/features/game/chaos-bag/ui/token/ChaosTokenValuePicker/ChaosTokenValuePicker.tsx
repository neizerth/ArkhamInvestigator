import {
	selectCurrentBoardProp,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
	PickerProps,
} from "../../../../../../widgets/control/picker";

import { setChaosTokenValue } from "@modules/chaos-bag/value/entities/lib/store/actions";
import {
	selectChaosTokenRangeByType as selectTokenRange,
	selectChaosTokenValueByType as selectTokenValue,
} from "@modules/chaos-bag/value/features/lib";
import type { ChaosTokenType } from "../../../model";
import type { ChaosTokenValueProps } from "../ChaosTokenValue";
import * as C from "./ChaosTokenValuePicker.components";

export type ChaosTokenValuePickerProps = Omit<
	PickerProps,
	"renderItem" | "data"
> & {
	valueStyle?: ChaosTokenValueProps["style"];
	type: ChaosTokenType;
};

const valueSizes = [1, 1, 0.7];

export const ChaosTokenValuePicker = ({
	type,
	valueStyle,
	...props
}: ChaosTokenValuePickerProps) => {
	const dispatch = useAppDispatch();
	const boardId = useAppSelector(selectCurrentBoardProp("id"));

	const value = useAppSelector(
		selectTokenValue({
			type,
			boardId,
		}),
	);

	const data = useAppSelector(
		selectTokenRange({
			type,
			boardId,
		}),
	);

	const setValue = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setChaosTokenValue({
					boardId,
					type,
					value,
				}),
			);
		},
		[dispatch, type, boardId],
	);

	const renderItem: PickerListRenderItem = useCallback(
		({ item }) => {
			return (
				<C.TokenValue
					value={item}
					type={type}
					style={valueStyle}
					sizes={valueSizes}
				/>
			);
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

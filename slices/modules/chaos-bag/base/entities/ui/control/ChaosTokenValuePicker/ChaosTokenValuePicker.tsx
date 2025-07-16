import { signedNumber, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
	PickerProps,
} from "../../../../../../../widgets/control/picker";

import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValueProps } from "@modules/chaos-bag/base/shared/ui";
import { setChaosTokenValue } from "@modules/chaos-bag/value/entities/lib";
import {
	selectChaosTokenRangeByType as selectTokenRange,
	selectChaosTokenValueByType as selectTokenValue,
} from "@modules/chaos-bag/value/features/lib";
import * as C from "./ChaosTokenValuePicker.components";

export type ChaosTokenValuePickerProps = Omit<
	PickerProps,
	"renderItem" | "data"
> &
	Partial<PropsWithBoardId> & {
		valueStyle?: ChaosTokenValueProps["style"];
		type: ChaosTokenType;
	};

const valueSizes = [1, 1, 0.7];

export const ChaosTokenValuePicker = ({
	type,
	valueStyle,
	boardId = "current",
	...props
}: ChaosTokenValuePickerProps) => {
	const dispatch = useAppDispatch();

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
			const value = signedNumber(item);
			return (
				<C.TokenValue
					value={value}
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

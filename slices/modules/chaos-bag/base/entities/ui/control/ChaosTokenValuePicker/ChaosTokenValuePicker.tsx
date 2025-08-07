import { signedNumber, useAppDispatch, useAppSelector } from "@shared/lib";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
	PickerProps,
} from "@widgets/control/picker";
import { useCallback } from "react";

import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValueProps } from "@modules/chaos-bag/base/shared/ui";
import { setChaosTokenValue } from "@modules/chaos-bag/value/entities/lib";
import {
	selectChaosTokenRangeByType as selectTokenRange,
	selectChaosTokenValueByType as selectTokenValue,
} from "@modules/chaos-bag/value/entities/lib";
import { isChaosTokenModified } from "@modules/chaos-bag/value/shared/lib";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import * as C from "./ChaosTokenValuePicker.components";

export type ChaosTokenValuePickerProps = Omit<
	PickerProps<ChaosTokenValue>,
	"renderItem" | "data"
> &
	Partial<PropsWithBoardId> & {
		valueStyle?: ChaosTokenValueProps["style"];
		type: ChaosTokenType;
		sealed?: boolean;
	};

const sealedSizes = [1, 1, 0.7];
const unsealedSizes = [0.9, 0.9, 0.65];

export const ChaosTokenValuePicker = ({
	type,
	valueStyle,
	boardId = "current",
	sealed,
	...props
}: ChaosTokenValuePickerProps) => {
	const dispatch = useAppDispatch();
	const valueSizes = sealed ? sealedSizes : unsealedSizes;

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
		({ value = 0 }: PickerChangeEvent<ChaosTokenValue>) => {
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

	const isModified = isChaosTokenModified({
		type,
		value,
	});

	const renderItem: PickerListRenderItem<ChaosTokenValue> = useCallback(
		({ item }) => {
			if (item === "fail") {
				return <C.AutoFail type={type} />;
			}
			if (item === "success") {
				return <C.AutoSuccess type={type} />;
			}
			const value = typeof item === "number" ? item : 0;
			const tokenValue = signedNumber(value);
			return (
				<C.TokenValue
					value={tokenValue}
					type={type}
					style={valueStyle}
					sizes={valueSizes}
					modified={isModified}
				/>
			);
		},
		[type, valueStyle, isModified, valueSizes],
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

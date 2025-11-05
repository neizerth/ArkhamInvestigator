import { characters } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { memo, useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";

import {
	addSingleChaosToken,
	removeChaosTokens,
	selectChaosTokenCountByType,
} from "@modules/chaos-bag/base/entities/lib";
import { selectMaxChaosTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import * as C from "./ChaosTokenDetails.components";

export type ChaosTokenDetailsProps = ViewProps & {
	type: ChaosTokenType;
	preview?: boolean;
	inputStyle?: ViewProps["style"];
	incrementLongPressEnabled?: boolean;
};

const MAX_PREVIEW_COUNT = 4;

export const ChaosTokenDetails = ({
	type,
	inputStyle,
	preview,
	incrementLongPressEnabled = true,
	...props
}: ChaosTokenDetailsProps) => {
	const dispatch = useAppDispatch();
	const count = useAppSelector(selectChaosTokenCountByType(type));
	const max = useAppSelector(selectMaxChaosTokenCount(type));

	const canAdd = count < max;
	const canRemove = count > 0;

	const clear = useCallback(() => {
		dispatch(
			removeChaosTokens({
				removeType: "all",
				boardId: "current",
				type,
			}),
		);
	}, [dispatch, type]);

	const onDecrement = useCallback(() => {
		if (!canRemove) {
			return false;
		}
		dispatch(
			removeChaosTokens({
				removeType: "type",
				boardId: "current",
				type,
			}),
		);
	}, [dispatch, canRemove, type]);

	const onIncrement = useCallback(() => {
		if (!canAdd) {
			return false;
		}

		dispatch(
			addSingleChaosToken({
				boardId: "current",
				type,
			}),
		);
	}, [dispatch, canAdd, type]);

	const canIncrementLongPress = incrementLongPressEnabled && canAdd;

	const onIncrementLongPress = useCallback(() => {
		if (!canIncrementLongPress) {
			return false;
		}
		dispatch(
			addSingleChaosToken({
				boardId: "current",
				type,
				sealed: true,
			}),
		);
	}, [dispatch, type, canIncrementLongPress]);

	const previewTokens = count > MAX_PREVIEW_COUNT;

	const previewTokenList = useMemo(() => {
		const maxPreviewCount = count > MAX_PREVIEW_COUNT ? 1 : count;
		return range(0, maxPreviewCount).map((key) => (
			<C.Token
				key={key}
				onPress={onDecrement}
				onLongPress={clear}
				activeOpacity={1}
			>
				<C.TokenIcon type={type} />
			</C.Token>
		));
	}, [count, type, onDecrement, clear]);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Input
					style={inputStyle}
					type={type}
					value={count}
					min={0}
					max={max}
					onDecrement={onDecrement}
					onIncrement={onIncrement}
					onIncrementLongPress={onIncrementLongPress}
					onDecrementLongPress={clear}
					onLongPress={clear}
					showValue={!preview}
				/>
				{preview && count > 0 && (
					<C.Preview>
						{previewTokens && (
							<C.Count>
								{characters.multiply}
								{count}
							</C.Count>
						)}

						{previewTokenList}
					</C.Preview>
				)}
			</C.Content>
		</C.Container>
	);
};

export const ChaosTokenDetailsMemo = memo(ChaosTokenDetails);

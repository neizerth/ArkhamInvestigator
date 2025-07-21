import { characters } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { memo, useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";

import {
	addChaosToken,
	removeChaosTokenByType,
	selectChaosTokenCountByType,
} from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import {
	removeAllChaosTokensByTypeInternal,
	selectUnlimitedChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import * as C from "./ChaosTokenDetails.components";

export type ChaosTokenDetailsProps = ViewProps & {
	type: ChaosTokenType;
	preview?: boolean;
	inputStyle?: ViewProps["style"];
};

const MAX_PREVIEW_COUNT = 4;

export const ChaosTokenDetails = ({
	type,
	inputStyle,
	preview,
	...props
}: ChaosTokenDetailsProps) => {
	const dispatch = useAppDispatch();
	const count = useAppSelector(selectChaosTokenCountByType(type));
	const isUnlimited = useAppSelector(selectUnlimitedChaosTokens);
	const max = isUnlimited ? 99 : chaosToken.count[type];

	const clear = useCallback(() => {
		dispatch(
			removeAllChaosTokensByTypeInternal({
				type,
			}),
		);
	}, [dispatch, type]);

	const onDecrement = useCallback(() => {
		if (count <= 0) {
			return false;
		}
		dispatch(
			removeChaosTokenByType({
				type,
			}),
		);
	}, [dispatch, count, type]);
	const onIncrement = useCallback(() => {
		if (count >= max) {
			return false;
		}

		dispatch(
			addChaosToken({
				type,
			}),
		);
	}, [dispatch, max, count, type]);

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

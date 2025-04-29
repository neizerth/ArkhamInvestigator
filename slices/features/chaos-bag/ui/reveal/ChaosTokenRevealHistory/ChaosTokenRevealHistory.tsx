import { useAppDispatch } from "@shared/lib";
import { memo, useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import { returnChaosToken, toggleChaosTokenSeal } from "../../../lib";
import type { ChaosBagToken } from "../../../model";
import * as C from "./ChaosTokenRevealHistory.components";

export type ChaosTokenRevealHistoryProps = ViewProps & {
	tokens: ChaosBagToken[];
};

export const ChaosTokenRevealHistory = ({
	tokens,
	...props
}: ChaosTokenRevealHistoryProps) => {
	const dispatch = useAppDispatch();
	const onTokenPress = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(returnChaosToken(token));
		},
		[dispatch],
	);

	const toggleSeal = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(toggleChaosTokenSeal(token.id));
		},
		[dispatch],
	);

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<ChaosBagToken>) => {
			return (
				<C.Button onPress={onTokenPress(item)} onLongPress={toggleSeal(item)}>
					<C.Position>
						<C.PositionText size={index.toString().length}>
							{index + 1}
						</C.PositionText>
					</C.Position>
					<C.Token {...item} />
				</C.Button>
			);
		},
		[onTokenPress, toggleSeal],
	);
	return (
		<C.Container {...props}>
			<C.List data={tokens} renderItem={renderItem} horizontal />
		</C.Container>
	);
};

export const ChaosTokenRevealHistoryMemo = memo(ChaosTokenRevealHistory);

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

	const showPosition = tokens.length > 1;

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<ChaosBagToken>) => {
			return (
				<C.Button onPress={onTokenPress(item)} onLongPress={toggleSeal(item)}>
					<C.Token
						token={item}
						position={index + 1}
						showPosition={showPosition}
					/>
				</C.Button>
			);
		},
		[onTokenPress, toggleSeal, showPosition],
	);
	return (
		<C.Container {...props}>
			<C.List data={tokens} renderItem={renderItem} horizontal />
		</C.Container>
	);
};

export const ChaosTokenRevealHistoryMemo = memo(ChaosTokenRevealHistory);

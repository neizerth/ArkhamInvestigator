import { selectCurrentRevealedTokenId } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { memo, useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import type { RevealedChaosBagToken } from "../../../shared/model";
import * as C from "./ChaosTokenRevealHistory.components";

export type ChaosTokenRevealHistoryProps = ViewProps & {
	tokens: RevealedChaosBagToken[];
};

export const ChaosTokenRevealHistory = ({
	tokens,
	...props
}: ChaosTokenRevealHistoryProps) => {
	const currentTokenId = useAppSelector(selectCurrentRevealedTokenId);

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<RevealedChaosBagToken>) => {
			const selected = currentTokenId === item.id;

			return <C.Item index={index} token={item} selected={selected} />;
		},
		[currentTokenId],
	);
	return (
		<C.Container {...props}>
			<C.List
				data={tokens}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				horizontal
			/>
		</C.Container>
	);
};

export const ChaosTokenRevealHistoryMemo = memo(ChaosTokenRevealHistory);

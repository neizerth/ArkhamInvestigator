import { selectCurrentRevealedTokenId } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { memo, useCallback, useEffect, useRef } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import type { FlatList } from "react-native-gesture-handler";
import type { RevealedChaosBagToken } from "../../../shared/model";
import * as C from "./ChaosTokenRevealHistory.components";

export type ChaosTokenRevealHistoryProps = ViewProps & {
	tokens: RevealedChaosBagToken[];
	disableSelection?: boolean;
};

export const ChaosTokenRevealHistory = ({
	tokens,
	disableSelection = false,
	...props
}: ChaosTokenRevealHistoryProps) => {
	const ref = useRef<FlatList>(null);
	const currentTokenId = useAppSelector(selectCurrentRevealedTokenId);

	const count = tokens.length;

	useEffect(() => {
		if (ref.current && count > 0) {
			ref.current.scrollToEnd();
		}
	}, [count]);

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<RevealedChaosBagToken>) => {
			const selected = !disableSelection && currentTokenId === item.id;

			return <C.Item index={index} token={item} selected={selected} />;
		},
		[currentTokenId, disableSelection],
	);
	return (
		<C.Container {...props}>
			<C.List
				ref={ref}
				data={tokens}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				horizontal
			/>
		</C.Container>
	);
};

export const ChaosTokenRevealHistoryMemo = memo(ChaosTokenRevealHistory);

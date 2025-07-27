import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { setCurrentRevealedTokenId } from "../../../shared/lib";
import type { RevealedChaosBagToken } from "../../../shared/model";
import { returnChaosToken } from "../../lib";
import * as C from "./ChaosTokenRevealHistoryItem.components";

export type ChaosTokenRevealHistoryItemProps = ViewProps & {
	token: RevealedChaosBagToken;
	index: number;
	selected?: boolean;
};

export const ChaosTokenRevealHistoryItem = ({
	token,
	selected,
	index,
	...props
}: ChaosTokenRevealHistoryItemProps) => {
	const dispatch = useAppDispatch();

	const { id } = token;

	const onSwipeDown = useCallback(() => {
		dispatch(setCurrentRevealedTokenId(id));
	}, [dispatch, id]);

	const swipeDown = useSwipe({
		direction: "down",
		onSwipe: onSwipeDown,
	});

	const toggleSeal = useCallback(() => {
		dispatch(
			toggleChaosTokenSeal({
				id,
			}),
		);
	}, [dispatch, id]);

	const onTokenPress = useCallback(() => {
		if (selected) {
			dispatch(
				returnChaosToken({
					id,
				}),
			);
			return;
		}
		dispatch(setCurrentRevealedTokenId(id));
	}, [dispatch, selected, id]);

	return (
		<GestureDetector gesture={swipeDown}>
			<C.Button onPress={onTokenPress} onLongPress={toggleSeal} {...props}>
				<C.Token token={token} position={index + 1} selected={selected} />
			</C.Button>
		</GestureDetector>
	);
};

import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { returnSingleChaosToken } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { useLongPress, useTap } from "@modules/core/touch/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";

export const useGestures = (token: RevealedChaosBagToken) => {
	const dispatch = useAppDispatch();

	const id = token?.id;

	const onTap = useCallback(() => {
		if (!id) {
			return;
		}

		dispatch(
			returnSingleChaosToken({
				boardId: "current",
				id,
			}),
		);
	}, [dispatch, id]);

	const onLongPress = useCallback(() => {
		if (!id) {
			return;
		}

		dispatch(
			toggleChaosTokenSeal({
				id,
				boardId: "current",
				returnToRevealModal: true,
			}),
		);
	}, [dispatch, id]);

	const tap = useTap({
		onTap,
	});

	const longPress = useLongPress({
		onLongPress,
	});

	const gesture = useMemo(() => {
		return Gesture.Exclusive(tap, longPress);
	}, [tap, longPress]);

	return gesture;
};

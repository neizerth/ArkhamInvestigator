import { useAppDispatch, useAppSelector } from "@shared/lib";
import { init, last } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import { Directions, GestureDetector } from "react-native-gesture-handler";
import { useHapticSwipe } from "../../../../../haptic";
import {
	selectChaosBagLoadingAnimation,
	selectRevealedTokens,
	setCurrentTokenId,
} from "../../../../lib";
import type { ChaosBagToken } from "../../../../model";
import * as C from "./ChaosTokenRevealModal.components";
import { useTokenRevealModal } from "./hooks";

export type ChaosTokenRevealModalProps = ViewProps;

export const ChaosTokenRevealModal = (props: ChaosTokenRevealModalProps) => {
	const dispatch = useAppDispatch();
	const tokens = useAppSelector(selectRevealedTokens);
	const animate = useAppSelector(selectChaosBagLoadingAnimation);

	const control = useTokenRevealModal();

	const lastToken = last(tokens) as ChaosBagToken;

	const onSwipeDown = useCallback(() => {
		dispatch(setCurrentTokenId(lastToken.id));
	}, [dispatch, lastToken]);

	const swipeDown = useHapticSwipe({
		direction: Directions.DOWN,
		onSwipe: onSwipeDown,
	});

	const history = useMemo(() => {
		return init(tokens);
	}, [tokens]);

	if (!control.visible) {
		return null;
	}

	if (tokens.length === 0) {
		return animate ? (
			<C.Loader {...props} onLoad={control.reveal} show={control.visible} />
		) : null;
	}

	const loadMore = animate ? control.enableLoading : control.reveal;

	return (
		<C.Container {...props}>
			<C.Content>
				<C.TopView>
					<C.History tokens={history} />
					<C.BlessCurse />
				</C.TopView>

				<C.LeftView />
				<C.RightView />

				<C.BottomView
					onClose={control.close}
					onLoadMore={loadMore}
					onReturnTokens={control.returnTokens}
				/>

				<GestureDetector gesture={swipeDown}>
					<C.TokenButton
						activeOpacity={1}
						onPress={control.onTokenPress(lastToken)}
						onLongPress={control.toggleSeal(lastToken)}
					>
						<C.LastToken {...lastToken} />
						<C.Expression />
					</C.TokenButton>
				</GestureDetector>
				{control.oneMoreLoading && (
					<C.OneMoreLoaderCancel
						onPress={control.disableLoading}
						activeOpacity={1}
					>
						<C.OneMoreLoader onLoad={control.reveal} duration={500} show />
					</C.OneMoreLoaderCancel>
				)}
			</C.Content>
		</C.Container>
	);
};

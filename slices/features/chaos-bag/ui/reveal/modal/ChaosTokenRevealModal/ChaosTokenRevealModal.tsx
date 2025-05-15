import { useAppSelector, useBoolean } from "@shared/lib";
import { init, last } from "ramda";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import {
	selectChaosBagLoadingAnimation,
	selectRevealedTokens,
} from "../../../../lib";
import type { ChaosBagToken } from "../../../../model";
import * as C from "./ChaosTokenRevealModal.components";
import { useRevealModal } from "./hooks";

export type ChaosTokenRevealModalProps = ViewProps;

export const ChaosTokenRevealModal = (props: ChaosTokenRevealModalProps) => {
	const [oneMoreLoading, setOneMoreLoading] = useBoolean();
	const tokens = useAppSelector(selectRevealedTokens);
	const animate = useAppSelector(selectChaosBagLoadingAnimation);

	const control = useRevealModal();

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

	const loadMore = animate ? setOneMoreLoading.on : control.reveal;

	const lastToken = last(tokens) as ChaosBagToken;

	return (
		<C.Container {...props}>
			<C.Content>
				<C.TopView>
					<C.History tokens={history} />
					<C.BlessCurse />
				</C.TopView>

				<C.LeftView />

				<C.BottomView
					onClose={control.close}
					onLoadMore={loadMore}
					onReturnTokens={control.returnTokens}
				/>

				<C.TokenButton
					activeOpacity={1}
					onPress={control.onTokenPress(lastToken)}
					onLongPress={control.toggleSeal(lastToken)}
				>
					<C.LastToken {...lastToken} />
				</C.TokenButton>
				{oneMoreLoading && (
					<C.OneMoreLoaderCancel
						onPress={setOneMoreLoading.off}
						activeOpacity={1}
					>
						<C.OneMoreLoader onLoad={control.reveal} duration={500} show />
					</C.OneMoreLoaderCancel>
				)}
			</C.Content>
		</C.Container>
	);
};

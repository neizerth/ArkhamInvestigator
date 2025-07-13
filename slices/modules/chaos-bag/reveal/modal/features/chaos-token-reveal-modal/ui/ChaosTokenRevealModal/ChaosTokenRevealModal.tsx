import { useAppSelector } from "@shared/lib";
import { last } from "ramda";
import type { ViewProps } from "react-native";

import { selectChaosBagLoadingAnimation } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import type { ChaosBagToken } from "../../../../../../../../features/game/chaos-bag/model";
import * as C from "./ChaosTokenRevealModal.components";
import { useTokenRevealModal } from "./hooks";

export type ChaosTokenRevealModalProps = ViewProps;

export const ChaosTokenRevealModal = (props: ChaosTokenRevealModalProps) => {
	const tokens = useAppSelector(selectRevealedTokens);
	const animate = useAppSelector(selectChaosBagLoadingAnimation);

	const control = useTokenRevealModal();

	if (!control.visible) {
		return null;
	}

	if (tokens.length === 0) {
		return animate ? (
			<C.Loader {...props} onLoad={control.reveal} show={control.visible} />
		) : null;
	}

	const lastToken = last(tokens) as ChaosBagToken;

	const loadMore = animate ? control.enableLoading : control.reveal;

	return (
		<C.Container {...props} dark id={CustomModalId.chaosTokenReveal}>
			<C.Content>
				<C.TopView />

				<C.LeftView />
				<C.RightView />

				<C.CenterView
					lastToken={lastToken}
					onPress={control.onTokenPress(lastToken)}
					onLongPress={control.toggleSeal(lastToken)}
				/>

				<C.BottomView
					onClose={control.close}
					onLoadMore={loadMore}
					onReturnTokens={control.returnTokens}
				/>

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

import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import * as C from "./ChaosBagButton.components";
import { useChaosBagButtonGestures } from "./useChaosBagButtonGestures";

export type ChaosBagButtonProps = ViewProps;

export const ChaosBagButton = (props: ChaosBagButtonProps) => {
	const gestureConfig = useChaosBagButtonGestures();
	const revealedCount = useAppSelector(selectRevealedTokensCount);
	const showPreviousReveal = revealedCount > 0;

	return (
		<C.Container>
			<GestureDetector gesture={gestureConfig}>
				<C.Button {...props} icon="chaos-bag-thin">
					{showPreviousReveal && <C.LastReveal />}
				</C.Button>
			</GestureDetector>
		</C.Container>
	);
};

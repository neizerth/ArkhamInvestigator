import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import * as C from "./ChaosBagButton.components";
import { useChaosBagButtonGestures, useSealedTokenGroups } from "./lib";

export type ChaosBagButtonProps = ViewProps;

export const ChaosBagButton = (props: ChaosBagButtonProps) => {
	const gestureConfig = useChaosBagButtonGestures();
	const revealedCount = useAppSelector(selectRevealedTokensCount);
	const showPreviousReveal = revealedCount > 0;
	const sealedTokenGroups = useSealedTokenGroups("current");
	return (
		<C.Container>
			<GestureDetector gesture={gestureConfig}>
				<C.Button {...props} icon="chaos-bag-thin">
					{showPreviousReveal && <C.LastReveal />}
				</C.Button>
			</GestureDetector>
			{sealedTokenGroups.length > 0 && (
				<C.SealedTokenGroups>
					{sealedTokenGroups.map((group) => (
						<C.Token key={group.type} type={group.type} size={28} sealed />
					))}
				</C.SealedTokenGroups>
			)}
		</C.Container>
	);
};

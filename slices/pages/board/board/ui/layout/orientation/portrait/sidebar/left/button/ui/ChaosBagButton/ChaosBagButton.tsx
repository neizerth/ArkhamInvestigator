import { selectShowDifficulty } from "@modules/chaos-bag/base/shared/lib";
import { selectShowChaosBagOdds } from "@modules/chaos-bag/odds/shared/lib";
import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import * as C from "./ChaosBagButton.components";
import { useChaosBagButtonGestures, useSealedTokenGroups } from "./lib";

export type ChaosBagButtonProps = ViewProps;

const getCount = (count: number) => {
	return count > 1 ? count : 0;
};

export const ChaosBagButton = (props: ChaosBagButtonProps) => {
	const gestureConfig = useChaosBagButtonGestures();
	const revealedCount = useAppSelector(selectRevealedTokensCount);
	const showDifficulty = useAppSelector(selectShowDifficulty);
	const showOdds = useAppSelector(selectShowChaosBagOdds);
	const showPreviousReveal = revealedCount > 0;
	const sealedTokenGroups = useSealedTokenGroups("current");
	return (
		<C.Container>
			<C.Content>
				<GestureDetector gesture={gestureConfig}>
					<C.Button {...props}>
						<C.Background>{showOdds && <C.OddsValue />}</C.Background>
						{showPreviousReveal && <C.LastReveal />}
					</C.Button>
				</GestureDetector>
				{showDifficulty && <C.Difficulty />}
			</C.Content>
			{sealedTokenGroups.length > 0 && (
				<C.SealedTokenGroups>
					{sealedTokenGroups.map((group) => (
						<C.Token
							key={group.type}
							type={group.type}
							size={28}
							sealedCount={getCount(group.count)}
							sealed
						/>
					))}
				</C.SealedTokenGroups>
			)}
		</C.Container>
	);
};

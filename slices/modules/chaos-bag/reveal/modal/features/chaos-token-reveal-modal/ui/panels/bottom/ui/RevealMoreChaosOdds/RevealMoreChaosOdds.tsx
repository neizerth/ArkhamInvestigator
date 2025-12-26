import {
	selectBoardSkillTestOdds,
	selectShowChaosBagOdds,
} from "@modules/chaos-bag/odds/shared/lib";
import { useAppSelector } from "@shared/lib/hooks";
import { isNumber } from "ramda-adjunct";
import type { ViewProps } from "react-native";
import * as C from "./RevealMoreChaosOdds.components";

export type RevealMoreChaosOddsProps = ViewProps;

export const RevealMoreChaosOdds = (props: RevealMoreChaosOddsProps) => {
	const chaosOddsEnabled = useAppSelector(selectShowChaosBagOdds);
	const chaosOddsValue = useAppSelector(selectBoardSkillTestOdds);

	const showChaosOddsValue = chaosOddsEnabled && isNumber(chaosOddsValue);

	if (!showChaosOddsValue) {
		return null;
	}

	return (
		<C.Container {...props}>
			<C.Value>{chaosOddsValue}%</C.Value>
		</C.Container>
	);
};

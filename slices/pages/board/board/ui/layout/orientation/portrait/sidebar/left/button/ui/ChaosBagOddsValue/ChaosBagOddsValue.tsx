import { selectBoardChaosOddsTokens } from "@modules/chaos-bag/odds/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ValueProps } from "@shared/ui";
import { identity } from "ramda";
import * as C from "./ChaosBagOddsValue.components";
// import { selectBoardChaosBagRevealCount } from "@modules/chaos-bag/effect/entities/lib";

export type ChaosBagOddsValueProps = Omit<ValueProps, "value">;

export const ChaosBagOddsValue = (props: ChaosBagOddsValueProps) => {
	const revealCount = useAppSelector(selectBoardChaosOddsTokens("current"));

	identity(revealCount);
	// console.log(revealCount);
	const value = 30;
	const displayValue = `${value}%`;
	return <C.Content {...props} value={displayValue} />;
};

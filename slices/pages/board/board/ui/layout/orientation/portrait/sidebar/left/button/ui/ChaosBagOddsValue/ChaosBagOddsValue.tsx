import { selectBoardChaosBagOdds } from "@modules/chaos-bag/odds/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ValueProps } from "@shared/ui";
import * as C from "./ChaosBagOddsValue.components";
// import { selectBoardChaosBagRevealCount } from "@modules/chaos-bag/effect/entities/lib";

export type ChaosBagOddsValueProps = Omit<ValueProps, "value">;

export const ChaosBagOddsValue = (props: ChaosBagOddsValueProps) => {
	const value = useAppSelector(selectBoardChaosBagOdds("current"));

	// identity(revealCount);
	// console.log(revealCount);
	const displayValue = `${value}%`;
	return <C.Content {...props} value={displayValue} />;
};

import type { ValueProps } from "@shared/ui";
import * as C from "./ChaosBagOddsValue.components";
// import { useAppSelector } from "@shared/lib";
// import { selectBoardChaosBagRevealCount } from "@modules/chaos-bag/effect/entities/lib";

export type ChaosBagOddsValueProps = Omit<ValueProps, "value">;

export const ChaosBagOddsValue = (props: ChaosBagOddsValueProps) => {
	// const revealCount = useAppSelector(selectBoardChaosBagRevealCount("current"));

	// console.log(revealCount);
	const value = 30;
	const displayValue = `${value}%`;
	return <C.Content {...props} value={displayValue} />;
};

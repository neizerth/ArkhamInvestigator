import type { ValueProps } from "@shared/ui";
import * as C from "./ChaosBagOddsValue.components";
// import { selectBoardChaosBagRevealCount } from "@modules/chaos-bag/effect/entities/lib";

export type ChaosBagOddsValueProps = Omit<ValueProps, "value">;

export const ChaosBagOddsValue = (props: ChaosBagOddsValueProps) => {
	const displayValue = "0%";
	return <C.Content {...props} value={displayValue} />;
};

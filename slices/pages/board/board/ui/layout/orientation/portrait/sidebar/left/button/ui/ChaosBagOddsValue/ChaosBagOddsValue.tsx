import { useBoardChaosBagOdds } from "@modules/chaos-bag/odds/entities/lib";
import type { ValueProps } from "@shared/ui";
import * as C from "./ChaosBagOddsValue.components";
// import { selectBoardChaosBagRevealCount } from "@modules/chaos-bag/effect/entities/lib";

export type ChaosBagOddsValueProps = Omit<ValueProps, "value">;

export const ChaosBagOddsValue = (props: ChaosBagOddsValueProps) => {
	const { odds, isLoading } = useBoardChaosBagOdds("current");

	if (isLoading || odds === null) {
		return null;
	}

	const displayValue = `${odds}%`;
	return <C.Content {...props} value={displayValue} />;
};

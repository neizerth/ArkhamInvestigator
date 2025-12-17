import { selectBoardSkillTestOdds } from "@modules/chaos-bag/odds/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ValueProps } from "@shared/ui";
import { isNull } from "ramda-adjunct";
import * as C from "./ChaosBagOddsValue.components";
// import { selectBoardChaosBagRevealCount } from "@modules/chaos-bag/effect/entities/lib";

export type ChaosBagOddsValueProps = Omit<ValueProps, "value">;

export const ChaosBagOddsValue = (props: ChaosBagOddsValueProps) => {
	const value = useAppSelector(selectBoardSkillTestOdds);

	if (isNull(value)) {
		return null;
	}

	return <C.Content {...props} value={`${value}%`} />;
};

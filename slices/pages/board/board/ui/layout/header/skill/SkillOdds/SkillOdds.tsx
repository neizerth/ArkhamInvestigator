import { selectCurrentActualPropValue } from "@modules/board/base/shared/lib";
import { selectChaosOddsBySkill } from "@modules/chaos-bag/odds/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorSkillType } from "@shared/model";
import type { ViewProps } from "react-native";

export type SkillOddsProps = ViewProps & {
	type: InvestigatorSkillType;
};

export const SkillOdds = ({ type, ...props }: SkillOddsProps) => {
	const skillValue = useAppSelector(selectCurrentActualPropValue(type));
	const odds = useAppSelector((state) =>
		selectChaosOddsBySkill(state, skillValue),
	);
	return <></>;
};

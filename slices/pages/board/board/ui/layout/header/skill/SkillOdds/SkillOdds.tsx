import { selectChaosOddsBySkill } from "@modules/chaos-bag/odds/shared/lib";
import { useAppSelector } from "@shared/lib";
import { isNull } from "ramda-adjunct";
import type { ViewProps } from "react-native";
import * as C from "./SkillOdds.components";

export type SkillOddsProps = ViewProps & {
	skillValue: number;
};

export const SkillOdds = ({ skillValue, ...props }: SkillOddsProps) => {
	const odds = useAppSelector((state) =>
		selectChaosOddsBySkill(state, skillValue),
	);

	if (isNull(odds)) {
		return null;
	}
	const data = odds[0];

	return (
		<C.Container {...props}>
			<C.Content value={`${data}%`} />
		</C.Container>
	);
};

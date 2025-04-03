import { LayoutContext } from "@pages/board/config";
import { getSkillsSize } from "@pages/board/lib";
import { InvestigatorSkills } from "@widgets/game/investigator-skills";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./BoardSkills.components";

export type BoardSkillsProps = ViewProps;

export const BoardSkills = ({ ...props }: BoardSkillsProps) => {
	const { layout } = useContext(LayoutContext);

	const size = getSkillsSize(layout);

	return (
		<InvestigatorSkills {...size}>
			<C.Willpower {...size} />
			<C.Intellect {...size} />
			<C.Combat {...size} />
			<C.Agility {...size} />
		</InvestigatorSkills>
	);
};

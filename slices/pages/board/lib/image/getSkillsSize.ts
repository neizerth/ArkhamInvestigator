import { skillsStyle } from "@widgets/game/investigator-skills";
import type { HeaderLayout } from "../../model";

export const getSkillsSize = (layout: HeaderLayout) => {
	if (layout.type === "column") {
		const { width } = layout;
		const height = width / skillsStyle.ratio;

		return {
			width,
			height,
		};
	}
	const { scale } = layout;
	const width = skillsStyle.width * scale;
	const height = skillsStyle.height * scale;

	return {
		width,
		height,
	};
};

import { skillsStyle } from "@widgets/game/investigator";
import type { HeaderLayout } from "../../model";

export const getSkillsSize = (layout: HeaderLayout) => {
	if (layout.type === "column") {
		const { width } = layout;
		const height = Math.round(width / skillsStyle.ratio);

		return {
			width,
			height,
		};
	}
	const { scale } = layout;
	const width = Math.round(skillsStyle.width * scale);
	const height = Math.round(skillsStyle.height * scale);

	return {
		width,
		height,
	};
};

import { HEADER_HEIGHT, skillsStyle } from "@pages/board/config";
import type { HeaderLayout } from "@pages/board/model";
import type { Box } from "@shared/model";

const skillsRatio = skillsStyle.width / HEADER_HEIGHT;

export const getSkillsSize = (layout: HeaderLayout) => {
	if (layout.type === "column") {
		const scale = layout.width / skillsStyle.width;
		const { width } = layout;
		const height = width / skillsRatio;

		return {
			width,
			height,
			scale,
		};
	}
	const { scale } = layout;
	const width = skillsStyle.width * scale;
	const height = HEADER_HEIGHT * scale;

	return {
		width,
		height,
		scale,
	};
};
// export const getSkillsSize = (window: Box) => {
//   const titleLayout = getTitleSize(window);

//   const scaledWidth = titleLayout.scale * skillsStyle.width;

//   const width = Math.max(scaledWidth, window.width);
//   const scale = width / skillsStyle.width;

//   const height = skillsStyle.height * scale;
//   const marginLeft = skillsStyle.marginLeft * scale;

//   if (scaledWidth < window.width) {
//     return {
//       scale,
//       width,
//       height,
//       marginLeft
//     }
//   }
// }

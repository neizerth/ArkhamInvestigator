import { LayoutContext, SkillsContext } from "@pages/board/config";
import { getSkillsSize, useFactionImage } from "@pages/board/lib";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSkills.components";
import { getSkillsStyle } from "./getSkillsStyle";
import { images } from "./images";

export type InvestigatorSkillsProps = ViewProps;

export const InvestigatorSkills = ({ ...props }: InvestigatorSkillsProps) => {
	const { layout } = useContext(LayoutContext);
	const source = useFactionImage(images);

	const size = getSkillsSize(layout);
	const skillsStyle = getSkillsStyle(size);

	return (
		<SkillsContext.Provider value={size}>
			<C.Container {...props}>
				<C.Background source={source} width={size.width} height={size.height} />
				<C.Content style={skillsStyle}>
					<C.Willpower />
					<C.Intellect />
					<C.Combat />
					<C.Agility />
				</C.Content>
			</C.Container>
		</SkillsContext.Provider>
	);
};

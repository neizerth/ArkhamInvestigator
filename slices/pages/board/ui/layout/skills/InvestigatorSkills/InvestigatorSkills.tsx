import { LayoutContext, SkillsContext } from "@pages/board/config";
import { getSkillsSize, useFactionImage } from "@pages/board/lib";
import { useAppSelector } from "@shared/lib";
import { useContext } from "react";
import type { ViewProps, ViewStyle } from "react-native";
import * as C from "./InvestigatorSkills.components";
import { getSkillsStyle } from "./getSkillsStyle";
import { images } from "./images";
import { PropsWithBoard, PropsWithLayout } from "@pages/board/model";

export type InvestigatorSkillsProps = ViewProps & PropsWithLayout & PropsWithBoard

export const InvestigatorSkills = ({ 
	layout,
	board,
	...props 
}: InvestigatorSkillsProps) => {
	const source = useFactionImage({
		imagesSource: images
	});

	const size = getSkillsSize(layout);
	const skillsStyle = getSkillsStyle(size);

	return (
		<SkillsContext.Provider value={size}>
			<C.Container {...props}>
				<C.Background source={source} width={size.width} height={size.height} />
				<C.Content style={skillsStyle}>
					<C.Willpower board={board}/>
					<C.Intellect board={board}/>
					<C.Combat board={board}/>
					<C.Agility board={board}/>
				</C.Content>
			</C.Container>
		</SkillsContext.Provider>
	);
};

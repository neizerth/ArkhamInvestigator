import { useFactionImage } from "@pages/board/lib";
import type { InvestigatorSkillType } from "@shared/model";
import type React from "react";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSkills.components";
import { getSkillsStyle } from "./InvestigatorSkills.styles";
import { images } from "./images";

export type InvestigatorSkillsProps = ViewProps &
	InvestigatorBaseSkillsProps & {
		width: number;
		height: number;
	};

export type RenderInvestigatorSkillItem = {
	type: InvestigatorSkillType;
	width: number;
};

export type InvestigatorBaseSkillsProps = {
	renderSkill: (item: RenderInvestigatorSkillItem) => React.ReactElement;
};

export const InvestigatorSkills = ({
	width,
	height,
	renderSkill: renderSkillProp,
	...props
}: InvestigatorSkillsProps) => {
	const source = useFactionImage(images);

	const skillsStyle = getSkillsStyle(width);

	const renderSkill = useCallback(
		(type: InvestigatorSkillType) => {
			return renderSkillProp({
				type,
				width: width / 10,
			});
		},
		[width, renderSkillProp],
	);

	return (
		<C.Container {...props}>
			<C.Background width={width} height={height} source={source} />
			<C.Content style={skillsStyle}>
				{renderSkill("willpower")}
				{renderSkill("intellect")}
				{renderSkill("combat")}
				{renderSkill("agility")}
			</C.Content>
		</C.Container>
	);
};

import { skillsImages } from "@assets/images/game/skills";
import { getFactionImage } from "@shared/lib";
import type { InvestigatorSkillType, PropsWithFaction } from "@shared/model";
import type React from "react";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSkills.components";
import { getSkillsStyle } from "./InvestigatorSkills.styles";

const { round: rnd } = Math;

export type InvestigatorSkillsProps = ViewProps &
	InvestigatorBaseSkillsProps & {
		width: number;
		height: number;
	};

export type RenderInvestigatorSkillItem = {
	type: InvestigatorSkillType;
	width: number;
	height: number;
};

export type InvestigatorBaseSkillsProps = PropsWithFaction & {
	parallel: boolean;
	renderSkill: (item: RenderInvestigatorSkillItem) => React.ReactElement;
};

export const InvestigatorSkills = ({
	width,
	height,
	parallel,
	faction,
	renderSkill: renderSkillProp,
	...props
}: InvestigatorSkillsProps) => {
	const source = getFactionImage({
		images: skillsImages,
		parallel,
		faction,
	});

	const skillsStyle = getSkillsStyle(width);

	const renderSkill = useCallback(
		(type: InvestigatorSkillType) => {
			return renderSkillProp({
				type,
				width: rnd(width / 10),
				height: rnd(height * 0.85),
			});
		},
		[width, renderSkillProp, height],
	);

	return (
		<C.Container {...props}>
			<C.Background width={width} height={height} source={source}>
				<C.Content style={skillsStyle}>
					{renderSkill("willpower")}
					{renderSkill("intellect")}
					{renderSkill("combat")}
					{renderSkill("agility")}
				</C.Content>
			</C.Background>
		</C.Container>
	);
};

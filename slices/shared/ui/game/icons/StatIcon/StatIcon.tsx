import type {
	InvestigatorBoardStat,
	InvestigatorSkillType,
} from "@shared/model";
import { omit } from "ramda";
import { StyleSheet, type ViewStyle } from "react-native";
import { iconMapping } from "../../../../config";
import { Icon, type IconProps } from "../Icon";
import { SkillIcon } from "../SkillIcon";

export type StatIconProps = Omit<IconProps, "icon"> & {
	statType: InvestigatorBoardStat;
	dark?: boolean;
	contentContainerStyle?: ViewStyle;
};

const skillTypes = ["willpower", "agility", "combat", "intellect"];

export const StatIcon = ({ statType, style, ...props }: StatIconProps) => {
	const isSkill = skillTypes.includes(statType);

	if (isSkill) {
		const skillStyle = omit(["color"], StyleSheet.flatten(style));
		return (
			<SkillIcon
				{...props}
				style={skillStyle}
				skillType={statType as InvestigatorSkillType}
			/>
		);
	}
	return <Icon {...props} icon={iconMapping.stat.classic[statType]} />;
};

import type {
	InvestigatorBoardNumericStat,
	InvestigatorSkillType,
} from "@shared/model";
import { omit } from "ramda";
import { StyleSheet, type ViewStyle } from "react-native";
import { iconMapping } from "../../../../config";
import { Icon, type IconProps } from "../Icon";
import { SkillIcon } from "../SkillIcon";
import { getIconStyle, isSkill } from "./StatIcon.styles";

export type StatIconProps = Omit<IconProps, "icon"> & {
	statType: InvestigatorBoardNumericStat;
	dark?: boolean;
	contentContainerStyle?: ViewStyle;
};

export const StatIcon = ({ statType, ...props }: StatIconProps) => {
	const styleSheet = StyleSheet.flatten(props.style);

	if (isSkill(statType)) {
		const skillStyle = omit(["color"], styleSheet);
		return (
			<SkillIcon
				{...props}
				style={skillStyle}
				skillType={statType as InvestigatorSkillType}
			/>
		);
	}

	const icon = iconMapping.stat.classic[statType];

	const iconStyle = getIconStyle({ statType, style: props.style });

	return <Icon {...props} style={[props.style, iconStyle]} icon={icon} />;
};

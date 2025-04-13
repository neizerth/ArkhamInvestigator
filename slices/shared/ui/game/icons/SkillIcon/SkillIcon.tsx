import type { PropsWithSkill } from "@shared/model/ui";
import type { ViewStyle } from "react-native";
import type { IconProps } from "../Icon";
import {
	Background,
	Container,
	Foreground,
	type PropsWithTheme,
} from "./SkillIcon.components";

export type SkillIconProps = Omit<IconProps, "icon"> &
	PropsWithSkill &
	PropsWithTheme & {
		contentContainerStyle?: ViewStyle;
	};

export const SkillIcon = ({
	skillType,
	dark,
	contentContainerStyle,
	...props
}: SkillIconProps) => {
	const foreground = `skill_${skillType}_inverted`;
	const background = `skill_${skillType}`;
	return (
		<Container style={contentContainerStyle}>
			<Background
				{...props}
				skillType={skillType}
				icon={background}
				dark={dark}
			/>
			<Foreground {...props} icon={foreground} />
		</Container>
	);
};

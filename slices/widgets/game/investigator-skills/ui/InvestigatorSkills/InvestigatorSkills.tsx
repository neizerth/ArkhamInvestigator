import { useFactionImage } from "@pages/board/lib";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSkills.components";
import { getSkillsStyle } from "./InvestigatorSkills.styles";
import { images } from "./images";

export type InvestigatorSkillsProps = ViewProps & {
	width: number;
	height: number;
};

export const InvestigatorSkills = ({
	children,
	width,
	height,
	...props
}: InvestigatorSkillsProps) => {
	const source = useFactionImage(images);

	const skillsStyle = getSkillsStyle(width);

	return (
		<C.Container {...props}>
			<C.Background width={width} height={height} source={source} />
			<C.Content style={skillsStyle}>{children}</C.Content>
		</C.Container>
	);
};

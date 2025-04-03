import type { InvestigatorBaseSkillsProps } from "@widgets/game/investigator-skills";
import type {
	InvestigatoTitleBaseProps,
	InvestigatorTitleProps,
} from "@widgets/game/investigator-title";
import type { ViewProps } from "react-native";
import {
	getHeaderStyle,
	getSkillsSize,
	getSkillsStyle,
	getTitleSize,
} from "./InvestigatoHeader.styles";
import * as C from "./InvestigatorHeader.components";

export type InvestigatorHeaderProps = ViewProps &
	InvestigatorBaseSkillsProps &
	InvestigatoTitleBaseProps & {
		scale: number;
		width: number;
		direction: "row" | "column";
		gap: number;
		pressableTitle?: boolean;
		onTitlePress?: InvestigatorTitleProps["onPress"];
	};

export const InvestigatorHeader = ({
	style,
	...props
}: InvestigatorHeaderProps) => {
	const headerStyle = getHeaderStyle(props);
	const skillsStyle = getSkillsStyle(props);

	const titleSize = getTitleSize(props);
	const skillsSize = getSkillsSize(props);

	return (
		<C.Container {...props} style={[style, headerStyle]}>
			<C.Title {...props} {...titleSize} />
			<C.Skills {...props} {...skillsSize} style={skillsStyle} />
		</C.Container>
	);
};

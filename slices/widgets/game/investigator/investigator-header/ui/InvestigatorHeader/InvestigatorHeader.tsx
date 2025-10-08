import { memo } from "react";
import type { ViewProps } from "react-native";
import type { InvestigatorBaseSkillsProps } from "../../../investigator-skills";
import type { InvestigatoTitleBaseProps } from "../../../investigator-title";
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
	};

export const InvestigatorHeader = ({
	onLayout,
	style,
	pressableTitle,
	...props
}: InvestigatorHeaderProps) => {
	const headerStyle = getHeaderStyle(props);
	const skillsStyle = getSkillsStyle(props);

	const titleSize = getTitleSize(props);
	const skillsSize = getSkillsSize(props);

	return (
		<C.Container {...props} onLayout={onLayout} style={[style, headerStyle]}>
			<C.Title {...props} {...titleSize} pressable={pressableTitle} />
			<C.Skills {...props} {...skillsSize} style={skillsStyle} />
		</C.Container>
	);
};

export const InvestigatorHeaderMemo = memo(InvestigatorHeader);

import {
	type ExpressionDisplayProps as BaseProps,
	SkillCheckExpressionDisplay as Display,
} from "@widgets/game/skill-check";
import { useMemo } from "react";
import { getExpressionDisplayStyles } from "./ExpressionDisplay.styles";
import type { ExpressionDisplayType } from "./ExpressionDisplay.types";

export type ExpressionDisplayProps = BaseProps & {
	type?: ExpressionDisplayType;
};

export const ExpressionDisplay = ({
	type = "secondary",
	...props
}: ExpressionDisplayProps) => {
	const styleProps = useMemo(() => getExpressionDisplayStyles(type), [type]);
	return <Display {...props} {...styleProps} />;
};

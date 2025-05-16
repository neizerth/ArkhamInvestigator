import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import {
	selectChaosBagSkillCheckExpression,
	selectChaosBagSkillCheckTitle,
} from "../../../../../lib";
import * as C from "./ExpressionPanel.components";
import { getExpressionDisplayStyles } from "./ExpressionPanel.styles";

export type ExpressionPanelProps = ViewProps;

export const ExpressionPanel = (props: ExpressionPanelProps) => {
	const expression = useAppSelector(selectChaosBagSkillCheckExpression);
	const title = useAppSelector(selectChaosBagSkillCheckTitle);

	const styles = getExpressionDisplayStyles();

	return (
		<C.Container {...props}>
			<C.Content>
				{title && <C.Title>{title}</C.Title>}
				{!title && expression.length > 1 && (
					<C.Expression {...styles} data={expression} showDiff={false} />
				)}
			</C.Content>
		</C.Container>
	);
};

import {
	selectChaosBagSkillCheckExpression,
	selectChaosBagSkillCheckTitle,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useCallback, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ExpressionPanel.components";
import { getExpressionDisplayStyles } from "./ExpressionPanel.styles";

export type ExpressionPanelProps = ViewProps;

export const ExpressionPanel = (props: ExpressionPanelProps) => {
	const expression = useAppSelector(selectChaosBagSkillCheckExpression);
	const title = useAppSelector(selectChaosBagSkillCheckTitle);

	const styles = getExpressionDisplayStyles();

	const hasTitle = Boolean(title);

	const activeOpacity = hasTitle ? 0.2 : 1;

	const [showTitle, setShowTitle] = useState(true);

	const onContentPress = useCallback(() => {
		if (!hasTitle) {
			return false;
		}
		setShowTitle((show) => !show);
	}, [hasTitle]);

	return (
		<C.Container {...props}>
			<C.Content onPress={onContentPress} activeOpacity={activeOpacity}>
				{title && showTitle && <C.Title>{title}</C.Title>}
				{(!title || !showTitle) && expression.length > 1 && (
					<C.Expression {...styles} data={expression} showDiff={false} />
				)}
			</C.Content>
		</C.Container>
	);
};

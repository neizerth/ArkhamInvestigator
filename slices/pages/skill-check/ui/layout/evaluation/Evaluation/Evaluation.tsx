import {
	selectHistoryShown,
	selectSkillCheckData,
	useAppSelector,
} from "@shared/lib";
import { memo } from "react";
import type { ViewProps } from "react-native";
import { useSkillCheckLayoutType } from "../../../../lib";
import { ExpressionValue } from "../ExpressionValue";
import * as C from "./Evaluation.components";

export type EvaluationProps = ViewProps;

export const Evaluation = ({ ...props }: EvaluationProps) => {
	const data = useAppSelector(selectSkillCheckData);
	const historyShown = useAppSelector(selectHistoryShown);
	const layoutType = useSkillCheckLayoutType();
	const isLargeLayout = layoutType === "medium";

	const expressionData = data;

	const historySize = historyShown ? Number.POSITIVE_INFINITY : 5;

	return (
		<C.Container {...props}>
			<C.Content>
				{isLargeLayout && <C.History size={historySize} />}
				{!historyShown && (
					<C.Current>
						<C.Expression data={expressionData} type="primary" />
						<ExpressionValue />
					</C.Current>
				)}
			</C.Content>
		</C.Container>
	);
};

export const EvaluationMemo = memo(Evaluation);

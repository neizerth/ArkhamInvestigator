import {
	selectHistoryShown,
	selectSkillCheckData,
} from "@modules/board/skill-check/shared/lib";
import { useAppSelector } from "@shared/lib";
import { memo } from "react";
import type { ViewProps } from "react-native";
import { useSkillCheckLayoutType } from "../../../../lib";
import { EvaluationExpressionGestures as Gestures } from "../EvaluationExpressionGestures";
import { ExpressionValue } from "../ExpressionValue";
import * as C from "./Evaluation.components";

export type EvaluationProps = ViewProps;

export const Evaluation = ({ ...props }: EvaluationProps) => {
	const data = useAppSelector(selectSkillCheckData);
	const historyShown = useAppSelector(selectHistoryShown);
	const layoutType = useSkillCheckLayoutType();

	const isLargeLayout = layoutType === "medium";

	const expressionData = data;

	return (
		<C.Container {...props}>
			<C.Content>
				{isLargeLayout && <C.History size={Number.POSITIVE_INFINITY} />}

				{!historyShown && (
					<C.Current>
						<Gestures>
							<C.Expression data={expressionData} type="primary" />
						</Gestures>
						<ExpressionValue />
					</C.Current>
				)}
			</C.Content>
		</C.Container>
	);
};

export const EvaluationMemo = memo(Evaluation);

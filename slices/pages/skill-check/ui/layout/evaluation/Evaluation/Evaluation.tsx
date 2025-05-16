import {
	selectHistoryShown,
	selectSkillCheckData,
	useAppSelector,
	useLayoutSize,
} from "@shared/lib";
import { memo, useMemo } from "react";
import type { ViewProps } from "react-native";
import { useSkillCheckLayoutType } from "../../../../lib";
import { EvaluationExpressionGestures as Gestures } from "../EvaluationExpressionGestures";
import { ExpressionValue } from "../ExpressionValue";
import * as C from "./Evaluation.components";

export type EvaluationProps = ViewProps;

const HISTORY_ITEM_HEIGHT = 35;

export const Evaluation = ({ ...props }: EvaluationProps) => {
	const data = useAppSelector(selectSkillCheckData);
	const historyShown = useAppSelector(selectHistoryShown);
	const layoutType = useSkillCheckLayoutType();
	const [layoutSize, onLayout] = useLayoutSize();

	const isLargeLayout = layoutType === "medium";

	const expressionData = data;

	const historySize = useMemo(() => {
		if (!layoutSize?.height) {
			return 0;
		}
		if (historyShown) {
			return Number.POSITIVE_INFINITY;
		}
		const result = Math.floor(layoutSize.height / HISTORY_ITEM_HEIGHT);

		return Math.min(result, 5);
	}, [layoutSize, historyShown]);

	return (
		<C.Container {...props}>
			<C.Content>
				{isLargeLayout && <C.History onLayout={onLayout} size={historySize} />}
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

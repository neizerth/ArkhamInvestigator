import {
	selectHistoryShown,
	selectSkillCheckData,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import { useSkillCheckLayoutType } from "../../../../lib";
import { ExpressionDisplay } from "../ExpressionDisplay";
import { ExpressionHistory } from "../ExpressionHistory";
import { ExpressionValue } from "../ExpressionValue";
import * as C from "./Evaluation.components";

export type EvaluationProps = ViewProps;

export const Evaluation = ({ ...props }: EvaluationProps) => {
	const data = useAppSelector(selectSkillCheckData);
	const historyShown = useAppSelector(selectHistoryShown);
	const layoutType = useSkillCheckLayoutType();
	const isLargeLayout = layoutType === "medium";

	const expressionData = data;

	const historySize = historyShown ? Number.POSITIVE_INFINITY : 10;

	return (
		<C.Container {...props}>
			<C.Content>
				{isLargeLayout && <ExpressionHistory size={historySize} />}
				<C.Current>
					<ExpressionDisplay data={expressionData} type="primary" />
					<ExpressionValue />
				</C.Current>
			</C.Content>
		</C.Container>
	);
};

import { openSkillCheckChaosBagModal } from "@features/chaos-bag";
import {
	clearSkillCheckHistory,
	goBack,
	selectCurrentBoardProp,
	selectHistoryShown,
	selectSkillCheckType,
	setHistoryShown,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { useSkillCheckLayoutType } from "../../../../lib";
import * as C from "./SkillCheckHeader.components";

type SkillCheckHeaderProps = ViewProps;
export const SkillCheckHeader = ({ ...props }: SkillCheckHeaderProps) => {
	const dispatch = useAppDispatch();
	const type = useAppSelector(selectSkillCheckType);
	const stats = useAppSelector(selectCurrentBoardProp("value"));
	const value = type && stats[type];

	const historyShown = useAppSelector(selectHistoryShown);
	const layoutType = useSkillCheckLayoutType();
	const isLargeLayout = layoutType === "medium";

	const toggleHistory = useCallback(() => {
		dispatch(setHistoryShown(!historyShown));
	}, [dispatch, historyShown]);

	const clearHistory = useCallback(() => {
		dispatch(clearSkillCheckHistory());
	}, [dispatch]);

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const showReveal = useCallback(() => {
		if (!type || !value) {
			return;
		}

		dispatch(
			openSkillCheckChaosBagModal({
				type,
				value,
			}),
		);
	}, [dispatch, type, value]);

	return (
		<C.Container {...props}>
			<C.Content border={!isLargeLayout}>
				{type && (
					<C.CheckIcon onPress={showReveal}>
						<C.Stat icon={type} />
					</C.CheckIcon>
				)}
				<C.Controls>
					<C.Row>
						<C.Button icon="arrow_back" onPress={back} />
						<C.HistoryActions>
							<C.Button icon="trash" onPress={clearHistory} />
							<C.Button
								icon={historyShown ? "calculator" : "history"}
								onPress={toggleHistory}
							/>
						</C.HistoryActions>
					</C.Row>
				</C.Controls>
				{isLargeLayout && <C.Rule />}
			</C.Content>
		</C.Container>
	);
};

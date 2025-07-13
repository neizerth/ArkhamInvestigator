import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import {
	clearSkillCheckHistory,
	selectHistoryShown,
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyCharacter,
	selectSkillCheckType,
	setHistoryShown,
	setSkillCheckDifficulty,
	toggleSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { startChaosBagRevealInternal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useHapticSwipe } from "@modules/core/haptic/shared/lib";
import { goBack, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Directions, GestureDetector } from "react-native-gesture-handler";
import { useSkillCheckLayoutType } from "../../../../lib";
import * as C from "./SkillCheckHeader.components";

type SkillCheckHeaderProps = ViewProps;
export const SkillCheckHeader = ({ ...props }: SkillCheckHeaderProps) => {
	const dispatch = useAppDispatch();
	const type = useAppSelector(selectSkillCheckType);
	const stats = useAppSelector(selectCurrentBoardProp("value"));
	const difficulty = useAppSelector(selectSkillCheckDifficulty);
	const difficultyCharacter = useAppSelector(
		selectSkillCheckDifficultyCharacter,
	);

	const value = type && stats?.[type];

	const historyShown = useAppSelector(selectHistoryShown);
	const layoutType = useSkillCheckLayoutType();
	const isLargeLayout = layoutType === "medium";

	const toggleHistory = useCallback(() => {
		dispatch(setHistoryShown(!historyShown));
	}, [dispatch, historyShown]);

	const clearHistory = useCallback(() => {
		dispatch(clearSkillCheckHistory("current"));
	}, [dispatch]);

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const clearDifficulty = useCallback(() => {
		dispatch(setSkillCheckDifficulty(null));
	}, [dispatch]);

	const showReveal = useCallback(() => {
		if (!type || !value) {
			return;
		}

		dispatch(
			startChaosBagRevealInternal({
				type,
				value,
			}),
		);
	}, [dispatch, type, value]);

	const onSwipeDown = useCallback(() => {
		dispatch(toggleSkillCheckDifficultyType());
	}, [dispatch]);

	const swipeDown = useHapticSwipe({
		direction: Directions.DOWN,
		onSwipe: onSwipeDown,
	});

	return (
		<C.Container {...props}>
			<C.Content border={!isLargeLayout}>
				{type && (
					<GestureDetector gesture={swipeDown}>
						<C.StatType onLongPress={showReveal} onPress={clearDifficulty}>
							<C.Stat icon={type} />
							{typeof difficulty === "number" && (
								<C.Difficulty>
									{difficultyCharacter} {difficulty}
								</C.Difficulty>
							)}
						</C.StatType>
					</GestureDetector>
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

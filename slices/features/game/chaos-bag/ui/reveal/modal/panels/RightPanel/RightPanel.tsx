import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyCharacter,
	setSkillCheckDifficulty,
	toggleSkillCheckDifficultyType,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./RightPanel.components";

export type RightPanelProps = ViewProps;

export const RightPanel = ({ ...props }: RightPanelProps) => {
	const dispatch = useAppDispatch();
	const difficulty = useAppSelector(selectSkillCheckDifficulty);

	const dificultyCharacter = useAppSelector(
		selectSkillCheckDifficultyCharacter,
	);

	const clearDifficulty = useCallback(() => {
		dispatch(setSkillCheckDifficulty(null));
	}, [dispatch]);

	const toggleDifficultyType = useCallback(() => {
		dispatch(toggleSkillCheckDifficultyType());
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Actions>
				<C.Item>
					{typeof difficulty === "number" && (
						<>
							<C.CompareSymbol>{dificultyCharacter}</C.CompareSymbol>
							<C.Button
								onPress={clearDifficulty}
								onLongPress={toggleDifficultyType}
							>
								<C.Value value={difficulty} />
							</C.Button>
						</>
					)}
				</C.Item>
			</C.Actions>
		</C.Container>
	);
};

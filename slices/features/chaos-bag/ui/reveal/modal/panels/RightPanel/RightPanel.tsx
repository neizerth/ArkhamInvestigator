import { selectSkillCheckDifficulty, useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./RightPanel.components";

export type RightPanelProps = ViewProps;

export const RightPanel = ({ ...props }: RightPanelProps) => {
	const difficulty = useAppSelector(selectSkillCheckDifficulty);

	return (
		<C.Container {...props}>
			<C.Actions>
				<C.Difficulty>
					{difficulty !== null && (
						<>
							<C.CompareSymbol>⩾</C.CompareSymbol>
							<C.DifficultyText value={difficulty} />
						</>
					)}
				</C.Difficulty>
			</C.Actions>
		</C.Container>
	);
};

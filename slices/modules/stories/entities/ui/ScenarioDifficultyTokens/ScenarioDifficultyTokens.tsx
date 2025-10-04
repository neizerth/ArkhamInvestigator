import { selectStoryDifficulty } from "@modules/stories/shared/lib";
import { useAppSelector } from "@shared/lib";
import { identity } from "ramda";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioDifficultyTokens.components";

export type ScenarioDifficultyTokensProps = ViewProps;

export const ScenarioDifficultyTokens = (
	props: ScenarioDifficultyTokensProps,
) => {
	const difficulty = useAppSelector(selectStoryDifficulty);
	const tokens = difficulty?.tokens || [];
	return (
		<C.Container {...props}>
			{tokens.map((type, index) => (
				<C.Token key={identity(index)} type={type} />
			))}
		</C.Container>
	);
};

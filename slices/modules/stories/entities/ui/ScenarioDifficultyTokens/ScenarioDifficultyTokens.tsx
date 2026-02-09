import type { StoryDifficultyLevel } from "@modules/stories/shared/model";
import { identity } from "ramda";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioDifficultyTokens.components";

export type ScenarioDifficultyTokensProps = ViewProps & {
	difficulty?: StoryDifficultyLevel;
};

export const ScenarioDifficultyTokens = ({
	difficulty,
	...props
}: ScenarioDifficultyTokensProps) => {
	const tokens = difficulty?.tokens || [];
	return (
		<C.Container {...props}>
			{tokens.map((type, index) => (
				<C.Token key={identity(index)} type={type} />
			))}
		</C.Container>
	);
};

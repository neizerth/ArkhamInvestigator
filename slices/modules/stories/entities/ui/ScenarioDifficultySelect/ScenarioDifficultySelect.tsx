import type {
	Story,
	StoryDifficultyLevel,
} from "@modules/stories/shared/model";
import type { DropdownItem } from "@shared/ui";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import { getStoryDifficultyLevelById } from "../../../shared/lib";
import * as C from "./ScenarioDifficultySelect.components";

export type ScenarioDifficultySelectProps = ViewProps & {
	story?: Story | null;
	value?: StoryDifficultyLevel;
	onChange?: (difficulty?: StoryDifficultyLevel) => void;
};

export const ScenarioDifficultySelect = ({
	onChange,
	value,
	story,
	...props
}: ScenarioDifficultySelectProps) => {
	const { t } = useTranslation();

	const levels = story?.difficultyLevels || [];

	const data = useMemo(() => {
		return levels.map((difficulty) => {
			return {
				label: t(difficulty.text),
				value: difficulty.id,
			};
		});
	}, [levels, t]);

	const onDifficultyChange = useCallback(
		({ value }: DropdownItem<string>) => {
			const difficulty = getStoryDifficultyLevelById({
				story,
				difficultyId: value,
			});
			onChange?.(difficulty);
			// dispatch(setStoryDifficultyId(value));
		},
		[onChange, story],
	);

	return (
		<C.Container {...props}>
			<C.Select
				data={data}
				onChange={onDifficultyChange}
				label={t`Difficulty`}
				placeholder={t`Choose an option`}
				value={value?.id}
			/>
		</C.Container>
	);
};

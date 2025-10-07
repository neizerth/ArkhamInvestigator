import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { DropdownItem } from "@shared/ui";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import {
	selectStory,
	selectStoryDifficulty,
	setStoryDifficultyId,
} from "../../../shared/lib";
import * as C from "./ScenarioDifficultySelect.components";

export type ScenarioDifficultySelectProps = ViewProps;

export const ScenarioDifficultySelect = ({
	...props
}: ScenarioDifficultySelectProps) => {
	const dispatch = useAppDispatch();
	const story = useAppSelector(selectStory);
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

	const difficulty = useAppSelector(selectStoryDifficulty);
	const item = data.find(({ value }) => value === difficulty?.id);

	const onChange = useCallback(
		({ value }: DropdownItem<string>) => {
			dispatch(setStoryDifficultyId(value));
		},
		[dispatch],
	);

	return (
		<C.Container {...props}>
			<C.Select
				data={data}
				onChange={onChange}
				label={t`Difficulty`}
				placeholder={t`Choose an option`}
				value={item?.value}
			/>
		</C.Container>
	);
};

import { range } from "ramda";
import type { ViewProps } from "react-native";

import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyCharacter,
	setSkillCheckDifficulty,
	toggleSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import * as C from "./ChaosBagDifficulty.components";

export type ChaosBagDifficultyProps = ViewProps;

const data = range(0, 100);

export const ChaosBagDifficulty = (props: ChaosBagDifficultyProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectSkillCheckDifficulty) ?? 0;
	const character = useAppSelector(selectSkillCheckDifficultyCharacter);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent<number>) => {
			dispatch(setSkillCheckDifficulty(value));
		},
		[dispatch],
	);

	const onToggle = useCallback(() => {
		dispatch(toggleSkillCheckDifficultyType());
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Character>{character}</C.Character>
			<C.Picker
				data={data}
				value={value}
				onValueChanged={onChange}
				onLongPress={onToggle}
			/>
		</C.Container>
	);
};

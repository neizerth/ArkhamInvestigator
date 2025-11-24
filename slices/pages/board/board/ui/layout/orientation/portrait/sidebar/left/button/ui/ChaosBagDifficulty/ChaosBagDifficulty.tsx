import { range } from "ramda";
import type { ViewProps } from "react-native";

import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyCharacter,
	setSkillCheckDifficulty,
	toggleSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { setCustomChaosBagSkillValue } from "@modules/chaos-bag/base/entities/lib";
import {
	selectCustomSkillValue,
	setCustomSkillValue,
} from "@modules/chaos-bag/odds/shared/lib";
import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useAppDispatch, useAppSelector, useBoolean } from "@shared/lib";
import { useCallback } from "react";
import * as C from "./ChaosBagDifficulty.components";

export type ChaosBagDifficultyProps = ViewProps;

const data = range(0, 100);

export const ChaosBagDifficulty = (props: ChaosBagDifficultyProps) => {
	const dispatch = useAppDispatch();
	const [showSkillPicker, setShowSkillPicker] = useBoolean(false);
	const chaosBagSkillValue = useAppSelector(selectChaosBagSkillValue);
	const customSkillValue = useAppSelector(selectCustomSkillValue);

	const difficulty = useAppSelector(selectSkillCheckDifficulty) ?? 0;
	const character = useAppSelector(selectSkillCheckDifficultyCharacter);
	const skillType = useAppSelector(selectChaosBagSkillCheckType);

	const skillValue = chaosBagSkillValue ?? customSkillValue ?? 0;
	const value = showSkillPicker ? skillValue : difficulty;
	const showWild = !skillType && showSkillPicker;

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent<number>) => {
			if (!showSkillPicker) {
				dispatch(setSkillCheckDifficulty(value));
				return;
			}
			if (skillValue !== null) {
				dispatch(
					setCustomChaosBagSkillValue({
						boardId: "current",
						value,
					}),
				);
				return;
			}
			dispatch(setCustomSkillValue(value));
		},
		[showSkillPicker, skillValue, dispatch],
	);

	const onToggle = useCallback(() => {
		dispatch(toggleSkillCheckDifficultyType());
	}, [dispatch]);

	return (
		<C.Container {...props}>
			{showSkillPicker ? (
				<C.SkillValueView>
					<C.Character>{character}</C.Character>
					<C.FixedValue value={difficulty} />
				</C.SkillValueView>
			) : (
				<C.DifficultyView>
					<C.FixedValue value={skillValue} />
					<C.Character>{character}</C.Character>
				</C.DifficultyView>
			)}

			{showWild && <C.Wild icon="skill_wild" />}

			<C.Picker
				data={data}
				value={value}
				position={showSkillPicker ? "top" : "bottom"}
				onValueChanged={onChange}
				onLongPress={onToggle}
				onPress={setShowSkillPicker.toggle}
			/>
		</C.Container>
	);
};

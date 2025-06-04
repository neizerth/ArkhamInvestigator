import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyCharacter,
	setSkillCheckDifficulty,
	toggleSkillCheckDifficultyType,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { range } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
} from "../../../../../../../../../widgets/control/picker";
import * as C from "./DifficultyControl.components";

export type DifficultyControlProps = ViewProps;

const data = range(-9, 101);

export const DifficultyControl = (props: DifficultyControlProps) => {
	const dispatch = useAppDispatch();
	const difficulty = useAppSelector(selectSkillCheckDifficulty);
	const value = difficulty || 0;

	const dificultyCharacter = useAppSelector(
		selectSkillCheckDifficultyCharacter,
	);

	const clearDifficulty = useCallback(() => {
		dispatch(setSkillCheckDifficulty(null));
	}, [dispatch]);

	const toggleDifficultyType = useCallback(() => {
		dispatch(toggleSkillCheckDifficultyType());
	}, [dispatch]);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(setSkillCheckDifficulty(value));
		},
		[dispatch],
	);

	const renderItem: PickerListRenderItem = useCallback(({ item }) => {
		return <C.Difficulty value={item} />;
	}, []);

	return (
		<C.Container {...props}>
			<C.CompareSymbol>{dificultyCharacter}</C.CompareSymbol>
			<C.Content>
				<C.Control
					data={data}
					renderItem={renderItem}
					onPress={toggleDifficultyType}
					onLongPress={clearDifficulty}
					onValueChanged={onChange}
					value={value}
				/>
			</C.Content>
		</C.Container>
	);
};

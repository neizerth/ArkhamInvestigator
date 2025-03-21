import {
	decreaseBaseStat,
	decreaseCurrentStat,
	increaseBaseStat,
	increaseCurrentStat,
	selectCurrentBoard,
	setBaseStat,
	signedNumber,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { setCurrentStat } from "@shared/lib/store/features/board/actions/stats/current/setCurrentStat";
import { range } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import type { PickerChangeEvent } from "../../features";
import * as C from "./Actions.components";

export type ActionsProps = ViewProps;

export const Actions = ({ ...props }: ActionsProps) => {
	const dispatch = useAppDispatch();
	const board = useAppSelector(selectCurrentBoard);
	const { additionalAction, actions } = board.value;
	const baseValue = board.baseValue.actions;
	const initialValue = board.initialValue.actions;
	const value = board.value.actions;

	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			dispatch(setCurrentStat("actions", value));
		},
		[dispatch],
	);

	const toggleAdditionalAction = useCallback(() => {
		dispatch(setCurrentStat("additionalAction", !additionalAction));
	}, [dispatch, additionalAction]);

	const onLongPress = useCallback(() => {
		dispatch(increaseBaseStat("actions"));
		dispatch(increaseCurrentStat("actions"));
	}, [dispatch]);

	const onPress = useCallback(() => {
		const actions = value === 0 ? baseValue : value - 1;
		dispatch(setCurrentStat("actions", actions));
	}, [dispatch, value, baseValue]);

	const onDiffPress = useCallback(() => {
		dispatch(decreaseBaseStat("actions"));
		dispatch(decreaseCurrentStat("actions"));
	}, [dispatch]);

	const onDiffLongPress = useCallback(() => {
		const decreasedValue = Math.max(0, value - (baseValue - initialValue));
		dispatch(setBaseStat("actions", initialValue));
		dispatch(setCurrentStat("actions", decreasedValue));
	}, [dispatch, initialValue, baseValue, value]);

	return (
		<C.Container {...props}>
			<C.Content>
				{baseValue !== initialValue && (
					<C.InitialDiff 
						onPress={onDiffPress}
						onLongPress={onDiffLongPress}
					>
						<C.DiffValue value={signedNumber(baseValue - initialValue)} />
					</C.InitialDiff>
				)}
				<C.Picker
					value={value}
					data={range(0, 101)}
					onValueChanged={onChange}
					onPress={onPress}
					onLongPress={onLongPress}
				/>

				{board.baseValue.additionalAction && (
					<C.AdditionalAction
						onPress={toggleAdditionalAction}
						pressHapticPattern="effectTick"
					>
						<C.ActionIcon icon="investigator" />
						{!additionalAction && <C.UsedAction icon="cross_c" />}
					</C.AdditionalAction>
				)}
			</C.Content>
		</C.Container>
	);
};

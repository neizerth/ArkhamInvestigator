import { useStat } from "@pages/board/lib";
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
import * as C from "./Actions.components";

export type ActionsProps = ViewProps;

export const Actions = ({ ...props }: ActionsProps) => {
	const dispatch = useAppDispatch();
	const board = useAppSelector(selectCurrentBoard);
	const { additionalAction } = board.value;

	const { value, baseValue, initialValue, onChange, onLongPress } =
		useStat("actions");

	const toggleAdditionalAction = useCallback(() => {
		dispatch(setCurrentStat("additionalAction", !additionalAction));
	}, [dispatch, additionalAction]);

	const onPress = useCallback(() => {
		if (value !== 0) {
			dispatch(setCurrentStat("actions", value - 1));
			dispatch(setCurrentStat("additionalAction", true));
			return;
		}
		dispatch(setCurrentStat("actions", baseValue));
	}, [dispatch, value, baseValue]);

	const showDiff = baseValue !== initialValue;

	return (
		<C.Container {...props}>
			<C.Content>
				{showDiff && <C.BaseActions />}
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
					>
						<C.ActionIcon icon="investigator" />
						{!additionalAction && <C.UsedAction icon="cross_c" />}
					</C.AdditionalAction>
				)}
			</C.Content>
		</C.Container>
	);
};

import { useStat } from "@pages/board/lib";
import {
	selectCurrentStatBaseValue,
	selectCurrentStatValue,
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
	const additionalAction = useAppSelector(
		selectCurrentStatValue("additionalAction"),
	);
	const haveAdditionalActions = useAppSelector(
		selectCurrentStatBaseValue("additionalAction"),
	);

	const { value, baseValue, initialValue, onChange, onLongPress } =
		useStat("actions");

	const toggleAdditionalAction = useCallback(() => {
		dispatch(setCurrentStat("additionalAction", !additionalAction));
	}, [dispatch, additionalAction]);

	const onPress = useCallback(() => {
		if (value !== 0) {
			dispatch(setCurrentStat("actions", value - 1));
			return;
		}
		dispatch(setCurrentStat("actions", baseValue));
		dispatch(setCurrentStat("additionalAction", true));
	}, [dispatch, value, baseValue]);

	const showDiff = baseValue !== initialValue;

	return (
		<C.Container {...props}>
			<C.Content>
				{showDiff && <C.BaseActions limitMaxValue={false} />}
				<C.Picker
					value={value}
					data={range(0, 100)}
					onValueChanged={onChange}
					onPress={onPress}
					onLongPress={onLongPress}
				/>

				{haveAdditionalActions && (
					<C.AdditionalAction onPress={toggleAdditionalAction}>
						<C.ActionIcon icon="investigator" />
						{!additionalAction && <C.UsedAction icon="cross_c" />}
					</C.AdditionalAction>
				)}
			</C.Content>
		</C.Container>
	);
};

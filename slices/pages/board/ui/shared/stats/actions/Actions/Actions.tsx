import { useAppDispatch, useAppSelector } from "@shared/lib";
import { setCurrentStat } from "@shared/lib";
import { startNewTurn } from "@shared/lib";
import { selectHaveBoardAbilities } from "@shared/lib";
import { resetAbilityLimits } from "@shared/lib/store/features/board/actions/stats/ability/resetAbilityLimits";
import type { ImageBackgroundProps } from "@shared/ui";
import { range } from "ramda";
import { useCallback } from "react";
import { useStat } from "../../../../../lib";
import * as C from "./Actions.components";

export type ActionsProps = ImageBackgroundProps;

const actionsData = range(0, 100);

export const Actions = ({ ...props }: ActionsProps) => {
	const dispatch = useAppDispatch();
	const haveAdditionalActions = useAppSelector(selectHaveBoardAbilities);

	const { value, baseValue, initialValue, onChange, onLongPress } =
		useStat("actions");

	const onPress = useCallback(() => {
		if (value !== 0) {
			dispatch(setCurrentStat("actions", value - 1));
			dispatch(resetAbilityLimits(["turn"]));
			return;
		}
		dispatch(startNewTurn());
	}, [dispatch, value]);

	const showDiff = baseValue !== initialValue;

	return (
		<C.Container {...props}>
			<C.Content>
				{showDiff && <C.BaseActions limitMaxValue={false} />}
				<C.Picker
					value={value}
					data={actionsData}
					onValueChanged={onChange}
					onPress={onPress}
					onLongPress={onLongPress}
				/>

				{haveAdditionalActions && <C.Special />}
			</C.Content>
		</C.Container>
	);
};

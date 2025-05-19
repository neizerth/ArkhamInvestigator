import { makeAction, useAppDispatch, useAppSelector } from "@shared/lib";
import { selectHaveBoardAbilities } from "@shared/lib";
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
		dispatch(makeAction());
	}, [dispatch]);

	const showDiff = baseValue !== initialValue;

	return (
		<C.Container {...props}>
			{showDiff && <C.BaseActions limitMaxValue={false} />}
			<C.Background>
				<C.Content>
					<C.Picker
						value={value}
						data={actionsData}
						onValueChanged={onChange}
						onPress={onPress}
						onLongPress={onLongPress}
					/>

					{haveAdditionalActions && <C.Special />}
				</C.Content>
			</C.Background>
		</C.Container>
	);
};

import { selectCurrentActualPropValue } from "@modules/board/base/shared/lib";
import { setInvestigatorClues } from "@modules/mechanics/board/base/features/clues/set-clues";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { Clues, type CluesProps } from "../Clues";

export type InvestigatorCluesProps = CluesProps;

export const InvestigatorClues = (props: InvestigatorCluesProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentActualPropValue("clues"));
	const onChange = useCallback(
		(value = 0) => {
			dispatch(
				setInvestigatorClues({
					boardId: "current",
					value,
				}),
			);
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(
			setInvestigatorClues({
				boardId: "current",
				value: 0,
			}),
		);
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(
			setInvestigatorClues({
				boardId: "current",
				value: value + 1,
			}),
		);
	}, [dispatch, value]);

	return (
		<Clues
			{...props}
			onChange={onChange}
			onLongPress={onLongPress}
			onPress={onPress}
			value={value}
		/>
	);
};

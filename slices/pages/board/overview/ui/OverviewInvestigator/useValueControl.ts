import {
	decreaseCurrentStat,
	increaseCurrentStat,
	setCurrentStat,
	useAppDispatch,
} from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { useCallback } from "react";

export const useValueControl = (boardId: number) => {
	const dispatch = useAppDispatch();

	const onChange = useCallback(
		(stat: InvestigatorBoardNumericStat) =>
			({ value = 0 }: PickerChangeEvent) => {
				dispatch(
					setCurrentStat(stat, value, {
						boardId,
					}),
				);
			},
		[dispatch, boardId],
	);

	const setValue = useCallback(
		(stat: InvestigatorBoardNumericStat, value: number) => () => {
			dispatch(
				setCurrentStat(stat, value, {
					boardId,
				}),
			);
		},
		[dispatch, boardId],
	);

	const clear = useCallback(
		(stat: InvestigatorBoardNumericStat) => () => {
			dispatch(
				setCurrentStat(stat, 0, {
					boardId,
				}),
			);
		},
		[dispatch, boardId],
	);

	const increase = useCallback(
		(stat: InvestigatorBoardNumericStat, max?: number) => () => {
			dispatch(
				increaseCurrentStat(stat, max, {
					boardId,
				}),
			);
		},
		[dispatch, boardId],
	);

	const decrease = useCallback(
		(stat: InvestigatorBoardNumericStat, min?: number) => () => {
			dispatch(
				decreaseCurrentStat(stat, min, {
					boardId,
				}),
			);
		},
		[dispatch, boardId],
	);

	return {
		clear,
		increase,
		decrease,
		setValue,
		onChange,
	};
};

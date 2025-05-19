import {
	decreaseCurrentStat,
	increaseCurrentStat,
	setCurrentStat,
	useAppDispatch,
} from "@shared/lib";
import type { InvestigatorBoardStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { useCallback } from "react";

export const useValueControl = (boardId: number) => {
	const dispatch = useAppDispatch();

	const onChange = useCallback(
		(stat: InvestigatorBoardStat) =>
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
		(stat: InvestigatorBoardStat, value: number) => () => {
			dispatch(
				setCurrentStat(stat, value, {
					boardId,
				}),
			);
		},
		[dispatch, boardId],
	);

	const clear = useCallback(
		(stat: InvestigatorBoardStat) => () => {
			dispatch(
				setCurrentStat(stat, 0, {
					boardId,
				}),
			);
		},
		[dispatch, boardId],
	);

	const increase = useCallback(
		(stat: InvestigatorBoardStat, max?: number) => () => {
			dispatch(
				increaseCurrentStat(stat, max, {
					boardId,
				}),
			);
		},
		[dispatch, boardId],
	);

	const decrease = useCallback(
		(stat: InvestigatorBoardStat, min?: number) => () => {
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

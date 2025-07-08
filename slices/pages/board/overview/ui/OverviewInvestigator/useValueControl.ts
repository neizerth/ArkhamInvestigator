import {
	decreaseBoardActualPropValue,
	increaseBoardActualPropValue,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { useAppDispatch } from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { useCallback } from "react";

export const useValueControl = (boardId: number) => {
	const dispatch = useAppDispatch();

	const onChange = useCallback(
		(stat: InvestigatorBoardNumericStat) =>
			({ value = 0 }: PickerChangeEvent) => {
				dispatch(
					setBoardActualPropValue({
						boardId,
						prop: stat,
						value,
					}),
				);
			},
		[dispatch, boardId],
	);

	const setValue = useCallback(
		(stat: InvestigatorBoardNumericStat, value: number) => () => {
			dispatch(
				setBoardActualPropValue({
					boardId,
					prop: stat,
					value,
				}),
			);
		},
		[dispatch, boardId],
	);

	const clear = useCallback(
		(stat: InvestigatorBoardNumericStat) => () => {
			dispatch(
				setBoardActualPropValue({
					boardId,
					prop: stat,
					value: 0,
				}),
			);
		},
		[dispatch, boardId],
	);

	const increase = useCallback(
		(stat: InvestigatorBoardNumericStat, max?: number) => () => {
			dispatch(
				increaseBoardActualPropValue({
					boardId,
					prop: stat,
					max,
				}),
			);
		},
		[dispatch, boardId],
	);

	const decrease = useCallback(
		(stat: InvestigatorBoardNumericStat, min?: number) => () => {
			dispatch(
				decreaseBoardActualPropValue({
					boardId,
					prop: stat,
					min,
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

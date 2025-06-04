import { selectBoardById } from "@shared/lib";
import type { AppThunk, BoardId } from "@shared/model";
import type { ChaosTokenType } from "../../../../../../../model";
import { selectChaosTokenValue, setChaosTokenValue } from "../../../chaosBag";
import { selectBoardChaosTokenTypes } from "../../../selectors";
import { setInvestigatorChaosTokenValueByCode } from "./setInvestigatorChaosTokenValueByCode";

type Options = {
	boardId: BoardId;
	type: ChaosTokenType;
	value: number;
};
export const setChaosTokenValueByType =
	({ type, value, boardId }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const tokens = selectBoardChaosTokenTypes(boardId)(state);

		if (tokens.includes(type)) {
			const board = selectBoardById(boardId)(state);
			const { code } = board.investigator;

			dispatch(
				setInvestigatorChaosTokenValueByCode({
					code,
					value,
					type,
				}),
			);

			return;
		}

		const data = selectChaosTokenValue(state) || {};

		dispatch(
			setChaosTokenValue({
				...data,
				[type]: value,
			}),
		);
	};

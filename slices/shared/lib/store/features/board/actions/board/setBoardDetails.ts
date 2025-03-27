import type { ActionCreator } from "@reduxjs/toolkit";
import {
	getSelectedInvestigatorOptions,
	mergeBoardStats,
} from "@shared/lib/features";
import { getBoardStats } from "@shared/lib/features/game/board/getBoardStats";
import type { AppThunk } from "@shared/lib/store";
import type { SelectedInvestigator } from "@shared/model";
import { propEq } from "ramda";
import { selectInvestigatorSources } from "../../../investigators/investigatorSources/investigatorSources";
import { selectCurrentBoard } from "../../selectors";
import { setCurrentBoard } from "./setCurrentBoard";

type SetBoardDetailsOptions = {
	variantId?: string | null;
	skinId?: string | null;
};

export const setBoardDetails: ActionCreator<AppThunk> =
	({ variantId, skinId }: SetBoardDetailsOptions) =>
	(dispatch, getStore) => {
		if (!variantId && !skinId) {
			return;
		}

		const store = getStore();
		const board = selectCurrentBoard(store);
		const investigators = selectInvestigatorSources(store);

		if (!board) {
			return;
		}

		const { details, selection } = board;

		if (!details.media) {
			return;
		}

		const { code } = selection;

		const selectionId = board.id.toString();

		const item: SelectedInvestigator = {
			id: selectionId,
			code,
			variantId: variantId || selection.variantId,
			skinId: skinId || selection.skinId,
			details,
		};

		const id = variantId || selection.variantId || code;
		const investigator = investigators.find(propEq(id, "code"));

		if (!investigator) {
			return;
		}

		const { picture, additionalAction, isParallel } =
			getSelectedInvestigatorOptions({
				selection: item,
				media: details.media,
				details,
			});

		const stats = getBoardStats(investigator);

		const baseValue = {
			...board.initialValue,
			...stats,
			additionalAction,
		};

		const value = mergeBoardStats(board, baseValue);

		const data = {
			...board,
			initialValue: baseValue,
			investigator,
			baseValue,
			value,
			isParallel,
			picture,
			selection: item,
		};

		dispatch(setCurrentBoard(data));
	};

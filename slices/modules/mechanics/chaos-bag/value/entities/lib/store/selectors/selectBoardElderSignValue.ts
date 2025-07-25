import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";

const resourceCodes = [
	InvesigatorCode.JennyBarnes.base,
	InvesigatorCode.JennyBarnes.book,
	InvesigatorCode.IsabelleBarnes,
];

export const selectBoardElderSignValue = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectChaosBagContents],
		(board, tokens) => {
			const { code } = board.investigator;
			const { value, baseValue } = board;

			if (resourceCodes.includes(code)) {
				return value.resources;
			}

			if (code === InvesigatorCode.MarkHarrigan) {
				const damage = Math.max(0, baseValue.health - value.health);
				return damage;
			}

			if (code === InvesigatorCode.AgnesBaker) {
				const horror = Math.max(0, baseValue.sanity - value.sanity);
				return horror;
			}

			if (code === InvesigatorCode.ZoeySamaras.parallel) {
				const blessCount = tokens.filter(propEq("bless", "type")).length;
				return blessCount;
			}
		},
	);

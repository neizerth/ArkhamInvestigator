import { createSelector } from "@reduxjs/toolkit";
import { prop, propEq } from "ramda";
import { selectInvestigatorBoards } from "../../board";
import { selectInvestigatorMedia } from "../../investigators";
import { selectReplaceCode } from "./selectReplaceCode";

export const selectDisabledInvestigators = createSelector(
	[selectReplaceCode, selectInvestigatorBoards, selectInvestigatorMedia],
	(replaceCode, boards, investigatorsMedia) => {
		if (!replaceCode) {
			return [];
		}
		const media = investigatorsMedia.find(propEq(replaceCode, "code"));

		if (!media) {
			return [];
		}

		return boards
			.filter(({ details, investigator }) => {
				return !details.media?.multiselect && investigator.code !== replaceCode;
			})
			.map(prop("investigator"));
	},
);

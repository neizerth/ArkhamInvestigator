import { createSelector } from "@reduxjs/toolkit";
import { InvesigatorCode } from "@shared/config";
import { selectBoardByCode } from "@shared/lib";

const resourceCodes = [
	InvesigatorCode.JennyBarnes.base,
	InvesigatorCode.JennyBarnes.book,
	InvesigatorCode.IsabelleBarnes,
];

const send = (value: number) => ({
	elderSign: value,
});

export const selectInvestigatorElderSignValue = (code: string) =>
	createSelector([selectBoardByCode(code)], (board) => {
		if (!board) {
			return;
		}

		const { value, baseValue } = board;

		if (resourceCodes.includes(code)) {
			return send(value.resources);
		}

		if (code === InvesigatorCode.MarkHarrigan) {
			const damage = Math.max(0, baseValue.health - value.health);
			return send(damage);
		}

		if (code === InvesigatorCode.AgnesBaker) {
			const horror = Math.max(0, baseValue.sanity - value.sanity);
			return send(horror);
		}
	});

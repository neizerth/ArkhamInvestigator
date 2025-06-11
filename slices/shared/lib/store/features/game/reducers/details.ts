import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameState } from "../game";

type SetSkinPayload = {
	code: string;
	skinId: string | null;
};
export const setInvestigatorSkin = (
	state: GameState,
	action: PayloadAction<SetSkinPayload>,
) => {
	const { code, skinId } = action.payload;

	const selectedInvestigators = state.selectedInvestigators.map(
		(investigator) =>
			investigator.code === code ? { ...investigator, skinId } : investigator,
	);

	return {
		...state,
		selectedInvestigators,
	};
};

type SetSignaturePayload = {
	code: string;
	signatureId: string | null;
};
export const setInvestigatorSignature = (
	state: GameState,
	action: PayloadAction<SetSignaturePayload>,
) => {
	const { code, signatureId } = action.payload;

	const selectedInvestigators = state.selectedInvestigators.map(
		(investigator) =>
			investigator.code === code
				? { ...investigator, signatureId }
				: investigator,
	);

	return {
		...state,
		selectedInvestigators,
	};
};

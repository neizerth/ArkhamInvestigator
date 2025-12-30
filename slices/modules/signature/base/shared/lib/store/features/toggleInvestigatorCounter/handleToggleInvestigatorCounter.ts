import type { SignatureHandler } from "@modules/signature/base/shared/model";

export type ToggleInvestigatorCounterPayload = {
	code: string;
	abilityId: string;
};

export const handleToggleInvestigatorCounter: SignatureHandler<
	ToggleInvestigatorCounterPayload
> = (state, { code, abilityId }) => {
	state.signatureSettings ??= {};
	state.signatureSettings[code] ??= {};
	state.signatureSettings[code].counters ??= {};

	const enabled = state.signatureSettings[code].counters[abilityId];
	state.signatureSettings[code].counters[abilityId] = !enabled;
};

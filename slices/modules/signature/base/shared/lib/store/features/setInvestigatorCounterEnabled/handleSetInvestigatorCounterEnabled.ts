import type { SignatureHandler } from "@modules/signature/base/shared/model";

export type SetInvestigatorCounterEnabledPayload = {
	code: string;
	abilityId: string;
	enabled: boolean;
};

export const handleSetInvestigatorCounterEnabled: SignatureHandler<
	SetInvestigatorCounterEnabledPayload
> = (state, { code, abilityId, enabled }) => {
	state.signatureSettings ??= {};
	state.signatureSettings[code] ??= {};
	state.signatureSettings[code].counters ??= {};

	state.signatureSettings[code].counters[abilityId] = enabled;
};

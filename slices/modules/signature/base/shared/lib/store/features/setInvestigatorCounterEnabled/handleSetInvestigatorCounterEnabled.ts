import type { SignatureHandler } from "@modules/signature/base/shared/model";

export type SetInvestigatorCounterEnabledPayload = {
	code: string;
	abilityId: string;
	enabled: boolean;
};

export const handleSetInvestigatorCounterEnabled: SignatureHandler<
	SetInvestigatorCounterEnabledPayload
> = (state, { code, abilityId, enabled }) => {
	state.investigatorSettings ??= {};
	state.investigatorSettings[code] ??= {};
	state.investigatorSettings[code].counters ??= {};

	state.investigatorSettings[code].counters[abilityId] = enabled;
};

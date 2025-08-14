import type { SignatureHandler } from "@modules/signature/shared/model";

export type ToggleInvestigatorCounterPayload = {
	code: string;
	abilityId: string;
};

export const handleToggleInvestigatorCounter: SignatureHandler<
	ToggleInvestigatorCounterPayload
> = (state, { code, abilityId }) => {
	state.investigatorSettings ??= {};
	state.investigatorSettings[code] ??= {};
	state.investigatorSettings[code].counters ??= {};

	const enabled = state.investigatorSettings[code].counters[abilityId];
	state.investigatorSettings[code].counters[abilityId] = !enabled;
};

import type { InvestigatorSettings } from "@modules/signature/base/shared/model";
import type { SignatureState } from "../..";

export type SetInvestigatorSettingsPropPayload<
	T extends keyof InvestigatorSettings,
> = {
	code: string;
	prop: T;
	value: InvestigatorSettings[T];
};

export function handleSetInvestigatorSettingsProp<
	T extends keyof InvestigatorSettings,
>(state: SignatureState, payload: SetInvestigatorSettingsPropPayload<T>) {
	state.investigatorSettings ??= {};

	state.investigatorSettings[payload.code] ??= {};
	state.investigatorSettings[payload.code][payload.prop] = payload.value;
}

import type {
	InvestigatorSettings,
	SignatureHandler,
} from "@modules/signature/shared/model";

export type SetInvestigatorSettingsByCodePayload = {
	code: string;
	settings: InvestigatorSettings;
};

export const handleSetInvestigatorSettingsByCode: SignatureHandler<
	SetInvestigatorSettingsByCodePayload
> = (state, { code, settings }) => {
	state.investigatorSettings ??= {};

	state.investigatorSettings[code] = settings;
};

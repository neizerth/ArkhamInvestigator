import type { SignatureReducer } from "@modules/signature/base/shared/model";
import { handleClearTraumaSettings } from "./handleClearTraumaSettings";

export const clearTraumaSettingsReducer: SignatureReducer = (
	state,
	{ payload },
) => {
	handleClearTraumaSettings(state, payload);
};

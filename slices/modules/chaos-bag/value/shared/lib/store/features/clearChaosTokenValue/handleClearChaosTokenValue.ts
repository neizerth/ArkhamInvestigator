import type { ChaosTokenValueHandler } from "../../../../model";

export const handleClearChaosTokenValue: ChaosTokenValueHandler = (state) => {
	state.chaosTokenValue = null;
};

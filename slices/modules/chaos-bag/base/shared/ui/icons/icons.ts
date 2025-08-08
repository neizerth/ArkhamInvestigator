import { chaosToken } from "../../config";
import { createChaosTokenIcon } from "./createChaosTokenIcon";

export const AutoSuccessBold = createChaosTokenIcon({
	scale: 0.8,
	icon: "check-outline_bold",
	backgroundIcon: "check-fill",
	// foregroundColor: chaosToken.color.types.,
});

export const AutoSuccessThin = createChaosTokenIcon({
	scale: 0.8,
	icon: "check-outline",
	backgroundIcon: "check-fill",
});

export const AutoFail = createChaosTokenIcon({
	foregroundScale: 1.2,
	icon: "token_auto_fail_highlight",
	backgroundIcon: "token_auto_fail_highlight_inverse",
	foregroundColor: chaosToken.color.types.autoFail,
});

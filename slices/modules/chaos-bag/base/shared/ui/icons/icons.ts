import { chaosToken } from "../../config";
import { createChaosTokenIcon } from "./createChaosTokenIcon";

export const AutoSuccess = createChaosTokenIcon({
	icon: "check-fill",
	backgroundIcon: "check-outline",
});

export const AutoFail = createChaosTokenIcon({
	scale: 1.2,
	icon: "token_auto_fail_highlight",
	backgroundIcon: "token_auto_fail_highlight_inverse",
	backgroundColor: chaosToken.color.types.autoFail,
});

import type { ChaosOddsTokenInput } from "@expo-modules/chaos-odds";
import { isNumber } from "ramda-adjunct";
import type { ChaosBagOddsToken } from "../../entities/model";

export const mapTokenToChaosOddsTokenInput = (
	token: ChaosBagOddsToken,
): ChaosOddsTokenInput => ({
	token_type: token.type,
	value: isNumber(token.value) ? token.value : 0,
	is_fail: token.value === "fail",
	is_success: token.value === "success",
	reveal_count: token.revealCount,
});

import { numericChaosTokenTypes } from "../../config/token/types";
import type { ChaosTokenType, NumericChaosTokenType } from "../../model";

export const isNumericChaosTokenType = (
	type: ChaosTokenType,
): type is NumericChaosTokenType => {
	return numericChaosTokenTypes.includes(type);
};

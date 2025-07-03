import { chaosToken } from "../../config";
import type { ChaosTokenType } from "../../model";

export const isChaosTokenTypeRemovable = (type: ChaosTokenType) =>
	chaosToken.types.removable.includes(type);

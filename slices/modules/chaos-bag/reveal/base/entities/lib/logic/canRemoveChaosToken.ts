import { isChaosTokenTypeRemovable } from "@modules/chaos-bag/base/shared/lib";
import type { RevealedChaosBagToken } from "../../../shared/model";

export const canRemoveChaosToken = (token: RevealedChaosBagToken) =>
	isChaosTokenTypeRemovable(token.type) && !token.sealed;

import { isChaosTokenTypeRemovable } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";

export const canRemoveChaosToken = (token: ChaosBagToken) =>
	isChaosTokenTypeRemovable(token.type) && !token.sealed;

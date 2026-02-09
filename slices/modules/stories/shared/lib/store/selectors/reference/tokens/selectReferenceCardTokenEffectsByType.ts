import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { whereReferencePartTokenEq } from "@modules/chaos-bag/effect/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenEffects } from "./selectReferenceCardTokenEffects";

export const selectReferenceCardTokenEffectsByType = (type: ChaosTokenType) =>
	createSelector([selectReferenceCardTokenEffects], (effects) => {
		return effects.find(whereReferencePartTokenEq(type));
	});

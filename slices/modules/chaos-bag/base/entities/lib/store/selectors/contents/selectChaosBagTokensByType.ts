import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import { propEq } from "ramda";
import { selectOrderedChaosBagContents } from "./selectOrderedChaosBagContents";

export const selectChaosBagTokensByType =
	(type: ChaosTokenType) => (state: RootState) =>
		selectOrderedChaosBagContents(state).filter(propEq(type, "type"));

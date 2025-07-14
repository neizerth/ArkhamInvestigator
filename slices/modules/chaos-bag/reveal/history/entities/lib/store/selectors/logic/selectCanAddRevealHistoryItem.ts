import { selectChaosTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { RootState } from "@shared/model";
import { canAddRevealHistoryItem } from "../../../logic";

export const selectCanAddRevealHistoryItem = (state: RootState) =>
	canAddRevealHistoryItem({ chaosTokenCount: selectChaosTokenCount(state) });

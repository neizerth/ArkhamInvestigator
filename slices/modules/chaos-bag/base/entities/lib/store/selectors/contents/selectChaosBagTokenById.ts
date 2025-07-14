import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";

export const selectChaosBagTokenById = (id: string) => (state: RootState) =>
	selectChaosBagContents(state).find(whereId(id));

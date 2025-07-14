import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import type { RootState } from "@shared/model";
import { propEq } from "ramda";

export const selectIsInvestigatorDisabled =
	(code: string) => (state: RootState) =>
		selectInvestigatorBoards(state).some(propEq(code, "signatureGroupId"));

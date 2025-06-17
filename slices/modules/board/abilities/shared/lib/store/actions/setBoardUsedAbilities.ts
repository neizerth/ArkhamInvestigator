import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { InvestigatorBoardUsedAbility } from "@modules/board/abilities/shared/model";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SetUsedAbilitiesPayload = ChangeBoardEventPayload & {
	usedAbilities: InvestigatorBoardUsedAbility[];
};

export const setBoardUsedAbilities = createAction<SetUsedAbilitiesPayload>(
	`${abilitiesPrefix}/setUsed`,
);

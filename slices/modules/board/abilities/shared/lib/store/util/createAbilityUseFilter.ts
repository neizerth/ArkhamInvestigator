import type { PayloadAction } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import type { ActionCreatorPayload } from "@shared/model";
import { changeBoardHistoryAbilityUse } from "../features";

type Payload = ActionCreatorPayload<typeof changeBoardHistoryAbilityUse>;

export const createAbilityUseFilter =
	(id: string) =>
	(action: unknown): action is PayloadAction<Payload> => {
		if (!changeBoardHistoryAbilityUse.match(action)) {
			return false;
		}
		const { changedAbilities } = action.payload;

		const ability = changedAbilities.find(whereId(id));

		return Boolean(ability);
	};

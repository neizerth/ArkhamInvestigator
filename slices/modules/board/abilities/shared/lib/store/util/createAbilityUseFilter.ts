import type { PayloadAction } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import type { ActionCreatorPayload } from "@shared/model";
import { changeBoardHistoryAbilityUse } from "../features";

type Payload = ActionCreatorPayload<typeof changeBoardHistoryAbilityUse>;

type Options = {
	id: string;
	isUsed?: boolean;
};

export const createAbilityUseFilter =
	({ id, isUsed }: Options) =>
	(action: unknown): action is PayloadAction<Payload> => {
		if (!changeBoardHistoryAbilityUse.match(action)) {
			return false;
		}
		const { changedAbilities } = action.payload;

		const ability = changedAbilities.find(whereId(id));

		if (!ability) {
			return false;
		}

		if (typeof isUsed !== "boolean") {
			return true;
		}

		return ability.isUsed === isUsed;
	};

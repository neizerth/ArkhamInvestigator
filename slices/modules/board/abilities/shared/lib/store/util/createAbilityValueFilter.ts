import type { PayloadAction } from "@reduxjs/toolkit";
import type { ActionCreatorPayload } from "@shared/model";
import { boardAbilityValueSet } from "../actions";

type Payload = ActionCreatorPayload<typeof boardAbilityValueSet>;
export const createAbilityValueFilter =
	(id: string) =>
	(action: unknown): action is PayloadAction<Payload> => {
		if (!boardAbilityValueSet.match(action)) {
			return false;
		}

		return id === action.payload.abilityId;
	};

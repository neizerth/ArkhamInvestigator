import type { PayloadAction } from "@reduxjs/toolkit";
import type { ActionCreatorPayload } from "@shared/model";
import { boardAbilityValueChanged } from "..";

type Payload = ActionCreatorPayload<typeof boardAbilityValueChanged>;
export const createAbilityValueFilter =
	(id: string) =>
	(action: unknown): action is PayloadAction<Payload> => {
		if (!boardAbilityValueChanged.match(action)) {
			return false;
		}

		return id === action.payload.abilityId;
	};

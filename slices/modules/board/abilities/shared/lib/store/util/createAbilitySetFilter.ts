import type { PayloadAction } from "@reduxjs/toolkit";
import type { ActionCreatorPayload } from "@shared/model";
import { setBoardAbilityUse } from "../features";

type Payload = ActionCreatorPayload<typeof setBoardAbilityUse>;

type Options = {
	abilityId: string;
	canUse?: boolean;
	force?: boolean;
};

export const createAbilitySetFilter = ({
	abilityId,
	canUse = false,
	force = false,
}: Options) => {
	return (action: unknown): action is PayloadAction<Payload> => {
		if (!setBoardAbilityUse.match(action)) {
			return false;
		}

		const { payload } = action;

		if (payload.abilityId !== abilityId) {
			return false;
		}

		if (force && !payload.force) {
			return false;
		}

		return payload.canUse === canUse;
	};
};

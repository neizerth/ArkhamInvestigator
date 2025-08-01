import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { partiallyEquals } from "../../util/criteria";

export type CreatePayloadFilterOptions<Payload> = {
	actionCreator: ActionCreatorWithPayload<Payload>;
};

export const createPayloadFilter =
	<Payload>({ actionCreator }: CreatePayloadFilterOptions<Payload>) =>
	(criteria: Partial<Payload>) => {
		const equals = partiallyEquals(criteria);
		return (action: unknown) => {
			if (!actionCreator.match(action)) {
				return false;
			}

			return equals(action.payload);
		};
	};

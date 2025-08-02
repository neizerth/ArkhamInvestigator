import type { UIEventType } from "@modules/core/ui/model";
import { createPayloadFilter } from "@shared/lib";
import { UIEvent, type UIEventPayload } from "../actions";

type Criteria = Partial<UIEventPayload> & {
	types?: UIEventType[];
	exceptTypes?: UIEventType[];
};

const filterAction = createPayloadFilter({
	actionCreator: UIEvent,
});

export const createUIEventFilter = (criteria: Criteria) => {
	const filter = filterAction(criteria);

	return (action: unknown) => {
		if (!UIEvent.match(action)) {
			return false;
		}

		const { types, exceptTypes } = criteria;
		const { payload } = action;

		if (exceptTypes?.includes(payload.type)) {
			return false;
		}

		if (types && !types.includes(payload.type)) {
			return false;
		}

		return filter(action);
	};
};

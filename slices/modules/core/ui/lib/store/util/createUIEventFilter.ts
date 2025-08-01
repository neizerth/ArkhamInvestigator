import { createPayloadFilter } from "@shared/lib";
import { UIEvent, type UIEventPayload } from "../actions";

export type Options = Partial<UIEventPayload>;

export const createUIEventFilter = createPayloadFilter({
	actionCreator: UIEvent,
});

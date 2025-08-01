import { createPayloadFilter } from "@shared/lib/util";
import { touch } from "../actions";

export const createTouchFilter = createPayloadFilter({
	actionCreator: touch,
});

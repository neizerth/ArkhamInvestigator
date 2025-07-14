import { selectReferenceCardTokens } from "@shared/lib";
import type { RootState } from "@shared/model";
import { getReferenceCardTokenValues } from "../../logic";

export const selectCurrentReferenceCardTokenValues = (state: RootState) => {
	return getReferenceCardTokenValues(selectReferenceCardTokens(state));
};

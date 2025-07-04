import type { ReferencePart } from "arkham-investigator-data";

export const getReferencePartTokens = (item: ReferencePart) => {
	if (item.type === "single") {
		return [item.token];
	}
	return item.tokens;
};

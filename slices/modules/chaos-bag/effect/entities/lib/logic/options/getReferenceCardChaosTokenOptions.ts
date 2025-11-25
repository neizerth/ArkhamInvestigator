import type { ReferenceCardToken } from "arkham-investigator-data";

export const getReferenceCardChaosTokenOptions = (item: ReferenceCardToken) => {
	switch (item.type) {
		case "value":
		case "select":
			return item.options ?? [];
		default:
			return [];
	}
};

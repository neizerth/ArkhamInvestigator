import type { ReferenceCardTokenOption } from "arkham-investigator-data";

export const getTokenOptionLabel = (option: ReferenceCardTokenOption) => {
	return `${option.modified_value.modifier}. ${option.prompt}`;
};

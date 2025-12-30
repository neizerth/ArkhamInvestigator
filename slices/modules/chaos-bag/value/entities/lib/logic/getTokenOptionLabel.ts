import type { ReferenceCardTokenOption } from "arkham-investigator-data";
import { formatTokenOptionValue } from "./formatTokenOptionValue";

export const getTokenOptionLabel = (option: ReferenceCardTokenOption) => {
	const { modifier } = option.modified_value;
	const value = formatTokenOptionValue(modifier);

	return `${value}. ${option.prompt}`;
};

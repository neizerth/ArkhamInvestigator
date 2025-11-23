import type { ReferenceCardTokenValue } from "arkham-investigator-data";
import { formatChaosTokenValue } from "./formatChaosTokenValue";

export const getValueRange = ({
	value = 0,
	options = [],
}: ReferenceCardTokenValue) => {
	const values = options.map((item) =>
		formatChaosTokenValue(item.modified_value.modifier),
	);

	return [value, ...values];
};

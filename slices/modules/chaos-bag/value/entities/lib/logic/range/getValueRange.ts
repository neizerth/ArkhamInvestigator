import type { ReferenceCardTokenValue } from "arkham-investigator-data";
import { uniq } from "ramda";
import { formatChaosTokenValue } from "./formatChaosTokenValue";

export const getValueRange = ({
	value = 0,
	options = [],
}: ReferenceCardTokenValue) => {
	const values = options.map((item) =>
		formatChaosTokenValue(item.modified_value.modifier),
	);

	return uniq([value, ...values]);
};

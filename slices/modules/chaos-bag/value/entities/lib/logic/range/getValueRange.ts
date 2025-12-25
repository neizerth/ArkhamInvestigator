import type { ReferenceCardTokenValue } from "arkham-investigator-data";
import { uniq } from "ramda";
import { formatChaosTokenValue } from "./formatChaosTokenValue";

export const getValueRange = ({
	config,
	value = 0,
	options = [],
}: ReferenceCardTokenValue) => {
	const modifier = formatChaosTokenValue(config.modifier);
	const values = options.map((item) =>
		formatChaosTokenValue(item.modified_value.modifier),
	);

	return uniq([modifier, value, ...values]);
};

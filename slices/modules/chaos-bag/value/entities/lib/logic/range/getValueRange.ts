import type { ReferenceCardTokenValue } from "arkham-investigator-data";
import { formatRangeValue } from "./formatRangeValue";

export const getValueRange = ({
	value = 0,
	options = [],
}: ReferenceCardTokenValue) => {
	const values = options.map((item) =>
		formatRangeValue(item.modified_value.modifier),
	);

	return [value, ...values];
};

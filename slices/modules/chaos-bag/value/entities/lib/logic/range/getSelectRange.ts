import type { ReferenceCardTokenSelect } from "arkham-investigator-data";
import { formatRangeValue } from "./formatRangeValue";

export const getSelectRange = ({
	options = [],
	config,
}: ReferenceCardTokenSelect) => {
	const values = options.map((item) =>
		formatRangeValue(item.modified_value.modifier),
	);

	return [formatRangeValue(config.modifier), ...values];
};

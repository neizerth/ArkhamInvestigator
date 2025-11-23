import type { ReferenceCardTokenSelect } from "arkham-investigator-data";
import { formatChaosTokenValue } from "./formatChaosTokenValue";

export const getSelectRange = ({
	options = [],
	config,
}: ReferenceCardTokenSelect) => {
	const values = options.map((item) =>
		formatChaosTokenValue(item.modified_value.modifier),
	);

	return [formatChaosTokenValue(config.modifier), ...values];
};

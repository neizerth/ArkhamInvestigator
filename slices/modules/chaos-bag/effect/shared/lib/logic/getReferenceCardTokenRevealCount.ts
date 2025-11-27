import type { ReferenceCardToken } from "arkham-investigator-data";

export const getReferenceCardTokenRevealCount = (item: ReferenceCardToken) => {
	switch (item.type) {
		case "value":
		case "select":
			return item.options
				? item.options.map(
						({ modified_value }) => modified_value.reveal_another ?? 0,
					)
				: (item.config.reveal_another ?? 0);
		case "counter":
			return item.reveal_another ?? 0;
	}
};

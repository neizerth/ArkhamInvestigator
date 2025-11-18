import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ReferenceCardToken } from "arkham-investigator-data";

type ReturnType = Partial<Record<ChaosTokenType, number | number[]>>;

export const getReferenceCardTokenRevealCountConfig = (
	data: ReferenceCardToken[],
) => {
	const values = data.reduce((target, item) => {
		const { token } = item;
		target[token] = getTokenRevealCountConfig(item);
		return target;
	}, {} as ReturnType);

	return values;
};

const getTokenRevealCountConfig = (item: ReferenceCardToken) => {
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

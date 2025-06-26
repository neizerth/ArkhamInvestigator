import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ReferenceCardToken } from "arkham-investigator-data";

type ReturnType = Partial<Record<ChaosTokenType, number>>;

export const getReferenceCardTokenValues = (data: ReferenceCardToken[]) => {
	const values = data.reduce((target, item) => {
		const { token } = item;
		target[token] = getTokenValue(item);
		return target;
	}, {} as ReturnType);

	return values;
};

const getTokenValue = (item: ReferenceCardToken) => {
	switch (item.type) {
		case "value":
			return item.value || 0;
		case "counter":
			return item.max || 0;
		case "select": {
			const values = [item.value || 0, ...(item.values || [])];

			return Math.max(...values);
		}
	}
};

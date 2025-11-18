import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ReferenceCardToken } from "arkham-investigator-data";

type ReturnType = Partial<Record<ChaosTokenType, number>>;

type Options = {
	data: ReferenceCardToken[];
	optionIndex?: number;
};

export const getReferenceCardTokenRevealCount = ({
	data,
	optionIndex,
}: Options) => {
	const values = data.reduce((target, item) => {
		const { token } = item;
		target[token] = getTokenRevealCount({
			item,
			optionIndex,
		});
		return target;
	}, {} as ReturnType);

	return values;
};

type TokenRevealCountOptions = {
	item: ReferenceCardToken;
	optionIndex?: number;
};

const getTokenRevealCount = ({
	item,
	optionIndex = 0,
}: TokenRevealCountOptions) => {
	switch (item.type) {
		case "value":
		case "select": {
			const option = item.options
				? item.options[optionIndex].modified_value
				: item.config;
			return option.reveal_another ?? 0;
		}
		case "counter":
			return item.reveal_another ?? 0;
	}
};

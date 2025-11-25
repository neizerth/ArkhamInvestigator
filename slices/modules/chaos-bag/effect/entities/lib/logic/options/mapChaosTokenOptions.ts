import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ReferenceCardToken } from "arkham-investigator-data";
import { getReferenceCardChaosTokenOptions } from "./getReferenceCardChaosTokenOptions";

type OptionIndexMap = Partial<Record<ChaosTokenType, number | null>>;

type Options = {
	optionIndexMap: OptionIndexMap;
	tokens: ReferenceCardToken[];
};
export const mapChaosTokenOptions = ({ optionIndexMap, tokens }: Options) => {
	return tokens.map((item) => {
		const type = item.token;
		const index = optionIndexMap[type] ?? -1;
		const options = getReferenceCardChaosTokenOptions(item);
		const option = options[index];

		return {
			item,
			option,
		};
	});
};

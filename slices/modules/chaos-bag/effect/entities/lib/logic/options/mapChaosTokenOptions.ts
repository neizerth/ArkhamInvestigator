import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type {
	ReferenceCardToken,
	ReferenceCardTokenOption,
} from "arkham-investigator-data";
import { getReferenceCardChaosTokenOptions } from "./getReferenceCardChaosTokenOptions";

type OptionIndexMap = Partial<Record<ChaosTokenType, number | null>>;

type Options = {
	optionIndexMap: OptionIndexMap;
	tokens: ReferenceCardToken[];
};

type ReturnItem = {
	item: ReferenceCardToken;
	option?: ReferenceCardTokenOption;
};

type ReturnMap = Partial<Record<ChaosTokenType, ReturnItem>>;

export const mapChaosTokenOptions = ({ optionIndexMap, tokens }: Options) => {
	return tokens.reduce<ReturnMap>((acc, item) => {
		const type = item.token;
		const index = optionIndexMap[type] ?? -1;
		const options = getReferenceCardChaosTokenOptions(item);
		const option = options[index];

		acc[type] = {
			item,
			option,
		};
		return acc;
	}, {} as ReturnMap);
};

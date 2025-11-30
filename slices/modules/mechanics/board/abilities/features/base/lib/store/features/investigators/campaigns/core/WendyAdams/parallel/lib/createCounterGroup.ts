import type {
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { propEq } from "ramda";

export const createCountGroup = (tokens: ChaosBagToken[]) => {
	const getData = createCountFilter(tokens);
	const bless = getData("bless");
	const curse = getData("curse");

	return {
		bless,
		curse,
	};
};

const createCountFilter =
	(tokens: ChaosBagToken[]) => (type: ChaosTokenType) => {
		const data = tokens.filter(propEq(type, "type"));

		return {
			count: data.length,
			token: data[0],
		};
	};

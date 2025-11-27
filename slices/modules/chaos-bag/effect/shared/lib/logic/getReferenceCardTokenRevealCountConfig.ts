import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ReferenceCardToken } from "arkham-investigator-data";
import { getReferenceCardTokenRevealCount } from "./getReferenceCardTokenRevealCount";

type ReturnType = Partial<Record<ChaosTokenType, number | number[]>>;

export const getReferenceCardTokenRevealCountConfig = (
	data: ReferenceCardToken[],
) => {
	const values = data.reduce((target, item) => {
		const { token } = item;
		target[token] = getReferenceCardTokenRevealCount(item);
		return target;
	}, {} as ReturnType);

	return values;
};

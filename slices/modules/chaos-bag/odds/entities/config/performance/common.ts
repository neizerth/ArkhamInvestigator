import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { range } from "ramda";
import { v4 } from "uuid";

type CreateTokenOptions = {
	type: ChaosTokenType;
	value?: number;
	count?: number;
	revealCount?: number;
};

const createToken = ({
	type,
	value = 0,
	revealCount = 0,
}: CreateTokenOptions) => ({
	id: v4(),
	type,
	value,
	revealCount,
});

export const token = (options: CreateTokenOptions) =>
	range(0, options.count ?? 1).map(() => createToken(options));

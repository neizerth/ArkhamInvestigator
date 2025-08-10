import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { isNotEmpty } from "@shared/lib";

type Options = {
	result?: ChaosTokenValue | null;
	succeedBy?: number | null;
};

export const getChaosBagSkillCheckFailed = ({ result, succeedBy }: Options) => {
	return (isNotEmpty(succeedBy) && succeedBy < 0) || result === "fail";
};

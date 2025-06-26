import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { InvesigatorCode } from "@shared/config";

const JimCodes = [
	InvesigatorCode.JimCulver.base,
	InvesigatorCode.JimCulver.parallel,
];

type ReturnData = Partial<Record<ChaosTokenType, number>>;

export const getSpecialTokenValuesByCode = (code: string): ReturnData => {
	if (JimCodes.includes(code)) {
		return {
			skull: 0,
		};
	}
	return {};
};

import { InvesigatorCode } from "@shared/config";
import type { ChaosTokenType } from "../../model";

const JimCodes = [
	InvesigatorCode.JimCulver.base,
	InvesigatorCode.JimCulver.parallel,
];

type ReturnType = Partial<Record<ChaosTokenType, number>>;

export const getInvestigatorSpecialTokenValues = (code: string): ReturnType => {
	if (JimCodes.includes(code)) {
		return {
			skull: 0,
		};
	}
	return {};
};

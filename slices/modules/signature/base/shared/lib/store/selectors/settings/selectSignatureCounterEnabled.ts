import { defaultSignatureCounterEnabled } from "@modules/signature/base/shared/config";
import { createSelector } from "@reduxjs/toolkit";
import { selectSignatureSettingsProp } from "./selectSignatureSettingsProp";

type Options = {
	code: string;
	abilityId: string;
};
export const selectInvestigatorCounterEnabled = ({
	code,
	abilityId,
}: Options) =>
	createSelector(
		[
			selectSignatureSettingsProp({
				code,
				prop: "counters",
			}),
		],
		(counters) => counters?.[abilityId] ?? defaultSignatureCounterEnabled,
	);

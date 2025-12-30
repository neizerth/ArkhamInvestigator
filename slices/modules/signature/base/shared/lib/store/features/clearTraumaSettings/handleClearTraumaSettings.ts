import type { SignatureHandler } from "@modules/signature/base/shared/model";
import { omit } from "ramda";

export const handleClearTraumaSettings: SignatureHandler = (state) => {
	const settings = state.signatureSettings ?? {};

	const data = Object.entries(settings).reduce(
		(target, entry) => {
			const [code, value] = entry;

			target[code] = omit(["physicalTrauma", "mentalTrauma"], value);
			return target;
		},
		{} as typeof settings,
	);

	state.signatureSettings = data;
};

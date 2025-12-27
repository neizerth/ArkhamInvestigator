import type { SelectionHandler } from "@modules/selection/shared/model";
import { propEq, reject } from "ramda";

export type RemoveSelectedSignatureByCodePayload = {
	code: string;
};

export const handleRemoveSelectedSignatureByCode: SelectionHandler<
	RemoveSelectedSignatureByCodePayload
> = (state, { code }) => {
	const selected = state.selectedSignatures ?? [];
	const withCode = propEq(code, "code");
	const selectedSignatures = reject(withCode, selected);

	state.selectedSignatures = selectedSignatures;
};

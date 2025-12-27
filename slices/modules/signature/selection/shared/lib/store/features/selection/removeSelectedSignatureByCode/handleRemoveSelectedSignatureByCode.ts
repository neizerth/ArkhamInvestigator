import type { SignatureSelectionHandler } from "@modules/signature/selection/shared/model";
import { propEq, reject } from "ramda";

export type RemoveSelectedSignatureByCodePayload = {
	code: string;
};

export const handleRemoveSelectedSignatureByCode: SignatureSelectionHandler<
	RemoveSelectedSignatureByCodePayload
> = (state, { code }) => {
	const selected = state.selectedSignatures ?? [];
	const withCode = propEq(code, "code");
	const selectedSignatures = reject(withCode, selected);

	state.selectedSignatures = selectedSignatures;
};

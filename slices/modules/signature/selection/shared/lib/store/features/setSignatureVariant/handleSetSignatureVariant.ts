import type { SignatureSelectionHandler } from "@modules/signature/selection/shared/model";

export type SetSignatureVariantPayload = {
	code: string;
	signatureId: string | null;
};

export const handleSetSignatureVariant: SignatureSelectionHandler<
	SetSignatureVariantPayload
> = (state, { code, signatureId }) => {
	const signatures = state.selectedSignatures ?? [];

	const selectedSignatures = signatures.map((signature) =>
		signature.code === code ? { ...signature, signatureId } : signature,
	);

	state.selectedSignatures = selectedSignatures;
};

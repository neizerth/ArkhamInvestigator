import type { SignatureSelectionHandler } from "@modules/signature/selection/shared/model";

export type SetSignatureSkinPayload = {
	code: string;
	skinId: string | null;
};

export const handleSetSignatureSkin: SignatureSelectionHandler<
	SetSignatureSkinPayload
> = (state, { code, skinId }) => {
	const signatures = state.selectedSignatures ?? [];
	const selectedSignatures = signatures.map((signature) =>
		signature.code === code ? { ...signature, skinId } : signature,
	);

	state.selectedSignatures = selectedSignatures;
};

import type { SelectionHandler } from "@modules/selection/shared/model";

export type SetSignatureSkinPayload = {
	code: string;
	skinId: string | null;
};

export const handleSetSignatureSkin: SelectionHandler<
	SetSignatureSkinPayload
> = (state, { code, skinId }) => {
	const signatures = state.selectedSignatures ?? [];
	const selectedSignatures = signatures.map((signature) =>
		signature.code === code ? { ...signature, skinId } : signature,
	);

	state.selectedSignatures = selectedSignatures;
};

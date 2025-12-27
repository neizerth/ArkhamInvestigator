import type { SelectionHandler } from "@modules/selection/shared/model";

export const handleClearSelectedSignatures: SelectionHandler = (state) => {
	state.selectedSignatures = [];
};

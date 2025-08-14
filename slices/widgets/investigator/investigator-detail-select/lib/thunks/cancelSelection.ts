import { goBack } from "@shared/lib";
import { resetCurrentDetails } from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const cancelSelection = (): AppThunk => (dispatch) => {
	dispatch(resetCurrentDetails());
	dispatch(goBack());
};

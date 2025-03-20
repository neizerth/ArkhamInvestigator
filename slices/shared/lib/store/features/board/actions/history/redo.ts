import type { AppThunkCreator } from "@shared/lib/store";
import { goToHistory } from "./goToHistory";

export const redo: AppThunkCreator = () => (dispatch) =>
	dispatch(goToHistory(1));

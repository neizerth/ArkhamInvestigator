import type { AppThunkCreator } from "@shared/model";
import { goToHistory } from "./goToHistory";

export const redo: AppThunkCreator = () => (dispatch) =>
	dispatch(goToHistory(1));

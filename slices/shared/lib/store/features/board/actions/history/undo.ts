import type { AppThunkCreator } from "@shared/model";
import { goToHistory } from "./goToHistory";

export const undo: AppThunkCreator = () => (dispatch) =>
	dispatch(goToHistory(-1));

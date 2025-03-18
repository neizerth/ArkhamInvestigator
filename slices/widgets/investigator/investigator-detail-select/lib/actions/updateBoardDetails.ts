import { type AppThunkCreator, selectCurrentBoard, setBoardDetails } from "@shared/lib";
import { selectCurrentDetails } from "../selectors";

export const updateBoardDetails: AppThunkCreator = () => 
  (dispatch, getState) => {
    const state = getState();
    const board = selectCurrentBoard(state);
    const { selection } = selectCurrentDetails(state);

    if (!board || !selection) {
      return;
    }

    const { variantId, skinId, code } = selection;

    dispatch(setBoardDetails({
      variantId: variantId || code,
      skinId: skinId || code,
    }));
  }
import { type AppThunkCreator, selectCurrentBoard, selectCurrentInvestigatorDetails, setBoardDetails, setInvestigatorVariant } from "@shared/lib";
import type { InvestigatorDetailItem } from "@shared/model";

export const changeVariant: AppThunkCreator = (item: InvestigatorDetailItem | null) => 
  (dispatch, getState) => {
    const state = getState();
    const details = selectCurrentInvestigatorDetails(state);
    const board = selectCurrentBoard(state);
    const code = details?.investigator.code;

    if (!code) {
      return;
    }
    
    if (board) {
      dispatch(setBoardDetails({
        variantId: item?.value || code
      }));
    }
    dispatch(setInvestigatorVariant({
      code,
      variantId: item?.value || null
    }))
  }
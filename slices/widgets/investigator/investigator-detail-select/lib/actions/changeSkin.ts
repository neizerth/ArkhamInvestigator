import { type AppThunkCreator, selectCurrentBoard, selectCurrentInvestigatorDetails, setBoardDetails, setInvestigatorSkin } from "@shared/lib";
import type { InvestigatorDetailItem } from "@shared/model";

export const changeSkin: AppThunkCreator = (item: InvestigatorDetailItem | null) => 
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
        skinId: item?.value
      }));
    }
    dispatch(setInvestigatorSkin({
      code,
      skinId: item?.value || null
    }))
  }
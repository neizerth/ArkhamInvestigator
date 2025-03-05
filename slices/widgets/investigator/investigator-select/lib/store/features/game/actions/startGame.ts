import type { ActionCreator } from "@reduxjs/toolkit";
import { 
  navigateTo,
  setCurrentInvestigatorIndex, 
  setInvestigatorBoards, 
  setShowDescription, 
  type AppThunk 
} from "@shared/lib";
import { selectGameInvestigatorBoards } from "../selectors";

export const startGame: ActionCreator<AppThunk> = () => (dispatch, getState) =>{
  const state = getState();
  
  const investigatorBoards = selectGameInvestigatorBoards(state);

  dispatch(setInvestigatorBoards(investigatorBoards));
  dispatch(setCurrentInvestigatorIndex(0));
  dispatch(setShowDescription(false));

  dispatch(navigateTo('/board'));
}
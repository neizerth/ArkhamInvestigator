import type { ActionCreator } from "@reduxjs/toolkit";
import { 
  redirectTo,
  setCurrentInvestigatorIndex, 
  setInvestigatorBoards, 
  type AppThunk 
} from "@shared/lib";
import { selectGameInvestigatorBoards } from "../selectors";

export const startGame: ActionCreator<AppThunk> = () => (dispatch, getState) =>{
  const state = getState();
  
  const investigatorBoards = selectGameInvestigatorBoards(state);

  console.log({
    investigatorBoards
  })

  dispatch(setInvestigatorBoards(investigatorBoards));
  dispatch(setCurrentInvestigatorIndex(0));

  dispatch(redirectTo('/board'));
}
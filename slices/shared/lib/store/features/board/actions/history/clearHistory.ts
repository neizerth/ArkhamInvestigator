import type { AppThunkCreator } from "@shared/lib/store";
import { setCurrentBoard } from '../board/setCurrentBoard';
import { selectCurrentBoard } from '../../selectors/selectCurrentBoard';

export const clearHistory: AppThunkCreator = () => 
  (dispatch, getState) => {
    const state = getState();
    const board = selectCurrentBoard(state);

    if (!board) {
      return;
    }

    dispatch(setCurrentBoard({
      ...board,
      history: [],
      historyIndex: -1
    }))
  }
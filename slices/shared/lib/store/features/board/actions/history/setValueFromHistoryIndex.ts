import type { AppThunkCreator } from "@shared/lib/store";
import type { HistoryItem, InvestigatorBoard, InvestigatorBoardValues } from "@shared/model";

import { setCurrentBoard } from '../board/setCurrentBoard';
import { selectCurrentBoard } from '../../selectors/selectCurrentBoard';


export const setValueFromHistoryIndex: AppThunkCreator = (historyIndex: number) => 
  (dispatch, getState) => {
    const state = getState();
    const board = selectCurrentBoard(state);

    if (!board) {
      return;
    }

    const { history, baseValue } = board;

    const items = historyIndex === -1 ? 
      [] : 
      history.slice(0, historyIndex + 1);

    const patches = items.map(({ type, value }) => ({
      [type]: value
    }));

    const patch: Partial<InvestigatorBoardValues> = Object.assign({}, ...patches);

    const value: InvestigatorBoardValues = {
      ...baseValue, 
      ...patch
    };
    const data: InvestigatorBoard = {
      ...board,
      value,
      historyIndex
    }

    dispatch(setCurrentBoard(data));
  }
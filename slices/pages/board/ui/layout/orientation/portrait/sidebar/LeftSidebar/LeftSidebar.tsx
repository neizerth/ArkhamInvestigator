import { InvestigatorSelect } from '@pages/board/ui/shared/features';
import * as C from './LeftSidebar.components';
import type { ViewProps } from 'react-native';
import { redo, selectCurrentBoard, selectInvestigatorBoards, setValueFromHistoryIndex, undo, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback, useContext } from 'react';
import { LayoutContext, PortraitLayoutContext } from '@pages/board/config';

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({
  ...props
}: LeftSidebarProps) => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectInvestigatorBoards);
  const currentBoard = useAppSelector(selectCurrentBoard);
  const { height } = useContext(PortraitLayoutContext);
  const { historyIndex } = currentBoard;
  const historyLength = currentBoard.history.length;

  const onUndo = useCallback(() => {
    dispatch(undo())
  }, [dispatch]);

  const onRedo = useCallback(() => {
    dispatch(redo())
  }, [dispatch]);

  const beginHistory = useCallback(() => {
    dispatch(setValueFromHistoryIndex(0))
  }, [dispatch]);

  const returnToNow = useCallback(() => {
    dispatch(setValueFromHistoryIndex(historyLength - 1))
  }, [dispatch, historyLength]);

  const single = boards.length === 1; 

  const historyEnabled = historyLength > 0;
  const canUndo = historyEnabled && historyIndex !== -1;
  const canRedo = historyEnabled && historyIndex < historyLength - 1;
  
  return (
    <C.Container 
      {...props} 
      single={single}
      unit={height}
    >
      <C.History 
        single={single}
        unit={height}
      >
        <C.HistoryButton 
          onPress={onRedo}
          onLongPress={returnToNow}
          disabled={!canRedo}
        >
          <C.HistoryIcon icon="redo"/>
        </C.HistoryButton>
        <C.HistoryButton 
          onPress={onUndo}
          onLongPress={beginHistory}
          disabled={!canUndo}
        >
          <C.HistoryIcon icon="undo"/>
        </C.HistoryButton>
      </C.History>
      {!single && (
        <InvestigatorSelect/>
      )}
    </C.Container>
  );
}
import { InvestigatorSelect } from '@pages/board/ui/shared/features';
import * as C from './LeftSidebar.components';
import { ViewProps } from 'react-native';
import { redo, selectInvestigatorBoards, undo, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback, useContext } from 'react';
import { LayoutContext, PortraitLayoutContext } from '@pages/board/config';

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({
  ...props
}: LeftSidebarProps) => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectInvestigatorBoards);
  const { height } = useContext(PortraitLayoutContext);
  const onUndo = useCallback(() => {
    dispatch(undo())
  }, [dispatch]);

  const onRedo = useCallback(() => {
    dispatch(redo())
  }, [dispatch]);

  const single = boards.length === 1; 

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
        <C.HistoryButton onPress={onRedo}>
          <C.HistoryIcon icon="redo"/>
        </C.HistoryButton>
        <C.HistoryButton onPress={onUndo}>
          <C.HistoryIcon icon="undo"/>
        </C.HistoryButton>
      </C.History>
      {!single && (
        <InvestigatorSelect/>
      )}
    </C.Container>
  );
}
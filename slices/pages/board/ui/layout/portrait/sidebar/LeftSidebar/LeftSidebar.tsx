import { InvestigatorSelect } from '@pages/board/ui/features';
import * as C from './LeftSidebar.components';
import { ViewProps } from 'react-native';
import { selectInvestigatorBoards, useAppSelector } from '@shared/lib';
import { useContext } from 'react';
import { LayoutContext, PortraitLayoutContext } from '@pages/board/config';

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({
  ...props
}: LeftSidebarProps) => {
  const boards = useAppSelector(selectInvestigatorBoards);
  const { view } = useContext(LayoutContext);
  const { height } = useContext(PortraitLayoutContext);

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
        <C.Redo />
        <C.Undo />
      </C.History>
      {!single && (
        <InvestigatorSelect/>
      )}
    </C.Container>
  );
}
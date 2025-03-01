import { InvestigatorSelect } from '@pages/board/ui/features';
import * as C from './LeftSidebar.components';
import { ViewProps } from 'react-native';
import { selectInvestigatorBoards, useAppSelector } from '@shared/lib';

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({
  ...props
}: LeftSidebarProps) => {
  const boards = useAppSelector(selectInvestigatorBoards);
  const single = boards.length === 1; 

  return (
    <C.Container {...props} single={single}>
      <C.Redo />
      <C.Undo />
      {!single && (
        <InvestigatorSelect/>
      )}
    </C.Container>
  );
}
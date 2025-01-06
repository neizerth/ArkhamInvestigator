import { Block } from '@/components';
import { InvestigatorClues } from '../stats/InvestigatorClues/InvestigatorClues';
import { InvestigatorResources } from '../stats/InvestigatorResources/InvestigatorResources';
import S from './InvestigatorBoardSidebar.module.scss';

export type InvestigatorBoardSidebarProps = {

}

export const InvestigatorBoardSidebar = ({}: InvestigatorBoardSidebarProps) => {
  return (
    <Block className={S.container}>
      <InvestigatorClues
        value={0}
      />
      <InvestigatorResources
        value={5}
      />
    </Block>
  );
}
import { IInvestigator } from '@/types/api';
import S from './InvestigatorBoard.module.scss';
import { Block } from '@/components';
import { InvestigatorBoardImage as InvestigatorImage } from '../InvestigatorBoardImage/InvestigatorBoardImage';
import { InvestigatorBoardHeader as Header } from '../header/InvestigatorBoardHeader/InvestigatorBoardHeader';
import { InvestigatorHealth } from '../stats/InvestigatorHealth/InvestigatorHealth';

export type InvestigatorBoardProps = {
  investigator: IInvestigator
}

export const InvestigatorBoard = ({
  investigator
}: InvestigatorBoardProps) => {
  return (
    <Block className={S.container}>
      <Block className={S.header}>
        <Header 
          investigator={investigator}
        />
      </Block>
     
      <Block className={S.image}>
        <InvestigatorImage 
          investigator={investigator}
        />
      </Block>
      <Block className={S.health}>
        <InvestigatorHealth 
          investigator={investigator}
        />
      </Block>
    </Block>
  );
}
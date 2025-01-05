import { IInvestigator } from '@/types/api';
import S from './InvestigatorBoard.module.scss';
import { Block, Icon } from '@/components';
import { InvestigatorBoardImage as InvestigatorImage } from '../InvestigatorBoardImage/InvestigatorBoardImage';
import { InvestigatorBoardHeader as Header } from '../header/InvestigatorBoardHeader/InvestigatorBoardHeader';
import { InvestigatorHealth } from '../stats/InvestigatorHealth/InvestigatorHealth';
import { InvestigatorSanity } from '../stats/InvestigatorSanity/InvestigatorSanity';
import { InvestigatorActions } from '../stats/InvestigatorActions/InvestigatorActions';
import { InvestigatorResources } from '../stats/InvestigatorResources/InvestigatorResources';
import { InvestigatorClues } from '../stats/InvestigatorClues/InvestigatorClues';

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
      <Block className={S.sidebar}>
        <InvestigatorClues
          value={0}
        />
        <InvestigatorResources
          value={5}
        />
      </Block>
      <Block className={S.footer}>

        <Block className={S.return}>
          <Icon icon="left-arrow"/>
        </Block>
        <Block className={S.mainStats}>
          <InvestigatorHealth 
            value={investigator.health}
          />
          <InvestigatorSanity 
            value={investigator.sanity}
          />
          <InvestigatorActions 
            value={3}
          />
        </Block>
      </Block>
    </Block>
  );
}
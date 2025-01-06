import { Block } from '@/components/ui/common/Block/Block';
import S from './InvestigatorBoardFooter.module.scss';
import { InvestigatorHealth } from '../stats/InvestigatorHealth/InvestigatorHealth';
import { InvestigatorSanity } from '../stats/InvestigatorSanity/InvestigatorSanity';
import { InvestigatorActions } from '../stats/InvestigatorActions/InvestigatorActions';
import { IInvestigator } from '@/types/api';
import { Icon } from '@/components/ui/icons/Icon/Icon';

export type InvestigatorBoardFooterProps = {
  investigator: IInvestigator
}

export const InvestigatorBoardFooter = ({
  investigator
}: InvestigatorBoardFooterProps) => {
  return (
    <Block className={S.container}>
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
  );
}
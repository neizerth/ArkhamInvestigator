import { Block } from '@/components/ui/common/Block/Block';
import S from './InvestigatorBoardFooter.module.scss';
import { InvestigatorHealth } from '../stats/InvestigatorHealth/InvestigatorHealth';
import { InvestigatorSanity } from '../stats/InvestigatorSanity/InvestigatorSanity';
import { InvestigatorActions } from '../stats/InvestigatorActions/InvestigatorActions';
import { Icon } from '@/components/ui/icons/Icon/Icon';

export const InvestigatorBoardFooter = () => {
  return (
    <Block className={S.container}>
      <Block className={S.return}>
        <Icon icon="left-arrow"/>
      </Block>
      <Block className={S.mainStats}>
        <InvestigatorHealth/>
        <InvestigatorSanity/>
        <InvestigatorActions/>
      </Block>
    </Block>
  );
}
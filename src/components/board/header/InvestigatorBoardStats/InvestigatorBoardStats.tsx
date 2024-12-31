import { IInvestigator } from '@/types/api';
import S from './InvestigatorBoardStats.module.scss';
import { Block } from '@/components';
import { getBackground } from './images';

export type InvestigatorBoardStatsProps = {
  investigator: IInvestigator
}

export const InvestigatorBoardStats = ({}: InvestigatorBoardStatsProps) => {
  const background = getBackground();
  return (
    <Block>
      <img className={S.image} src={background}/>
    </Block>
  );
}
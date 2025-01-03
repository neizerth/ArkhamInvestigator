import S from './InvestigatorBoardHeader.module.scss';
import { IInvestigator } from '@/types/api';
import { Block } from '@/components';
import { InvestigatorBoardTitle } from '../InvestigatorBoardTitle/InvestigatorBoardTitle';
import { InvestigatorBoardSkills } from '../skills/InvestigatorBoardSkills/InvestigatorBoardSkills';

export type InvestigatorBoardHeaderProps = {
  investigator: IInvestigator
}

export const InvestigatorBoardHeader = ({ 
  investigator
}: InvestigatorBoardHeaderProps) => {
  return (
    <Block 
      className={S.container}
    >
      <InvestigatorBoardTitle
        investigator={investigator}
      />
      <div className={S.stats}>
        <InvestigatorBoardSkills
          investigator={investigator}
        />
      </div>
    </Block>
  );
}
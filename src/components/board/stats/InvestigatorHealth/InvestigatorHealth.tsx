import { IInvestigator } from '@/types/api';
import S from './InvestigatorHealth.module.scss';
import { Block, Image } from '@/components';
import { InvestigatorStatPicker } from '../InvestigatorStatPicker/InvestigatorStatPicker';
import { range } from 'ramda';
import { useState } from 'react';
import { BlockProps } from '@/components/ui/common/Block/Block';
import background from './images/health.png';

export type InvestigatorHealthProps = BlockProps & {
  investigator: IInvestigator
}

export const InvestigatorHealth = ({
  investigator,
  ...props
}: InvestigatorHealthProps) => {
  const { health } = investigator;
  const [currentHealth, setHealth] = useState(health);

  return (
    <Block {...props}>
      <Block className={S.container}>
        <Image 
          className={S.background}
          src={background}
        />

        <Block className={S.picker}>
          <InvestigatorStatPicker
            value={currentHealth}
            values={range(0, health + 1)}
            onChange={setHealth}
            valueClassName={S.value}
          />
        </Block>
      
      </Block>
    </Block>
  );
}
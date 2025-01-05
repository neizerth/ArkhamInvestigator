import S from './InvestigatorHealth.module.scss';
import { Image } from '@/components';
import { range } from 'ramda';
import { useState } from 'react';
import { BlockProps } from '@/components/ui/common/Block/Block';
import background from './images/health.png';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';

export type InvestigatorHealthProps = BlockProps & {
  value: number
}

export const InvestigatorHealth = ({
  value
}: InvestigatorHealthProps) => {
  const [health, setHealth] = useState(value);

  return (
    <InvestigatorStat
      containerClassName={S.container}
      className={S.picker}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={health}
      values={range(0, value + 1)}
      onChange={setHealth}
      >
      <Image
        className={S.background}
        src={background}
      />
    </InvestigatorStat>
  );
}
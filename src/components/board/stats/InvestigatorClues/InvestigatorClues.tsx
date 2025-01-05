import S from './InvestigatorClues.module.scss';
import { Image, Block } from '@/components';
import { useState } from 'react';
import { range } from 'ramda';
import background from './images/clue.svg';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';

export type InvestigatorCluesProps = {
  value: number;
}

export const InvestigatorClues = ({
  value
}: InvestigatorCluesProps) => {
  const [clues, setClues] = useState(value);

  return (
    <InvestigatorStat
      className={S.picker}
      containerClassName={S.container}
      activeClassName={S.active}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={clues}
      values={range(0, 100)}
      onChange={setClues}
    >
      <Image
        className={S.background}
        src={background}
      />
    </InvestigatorStat>
  );
}

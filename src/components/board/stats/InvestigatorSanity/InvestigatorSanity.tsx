import S from './InvestigatorSanity.module.scss';
import background from './images/sanity.png';
import { Image } from '@/components';
import { range } from 'ramda';
import { useState } from 'react';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';

export type InvestigatorSanityProps = {
  value: number;
}

export const InvestigatorSanity = ({
  value
}: InvestigatorSanityProps) => {
  const [sanity, setSanity] = useState(value);


  return (
    <InvestigatorStat
      containerClassName={S.container}
      className={S.picker}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={sanity}
      values={range(0, value + 1)}
      onChange={setSanity}
      >
      <Image
        className={S.background}
        src={background}
      />
    </InvestigatorStat>
  );
}
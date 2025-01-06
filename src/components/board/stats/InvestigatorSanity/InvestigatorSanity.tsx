import S from './InvestigatorSanity.module.scss';
import background from './images/sanity.png';
import { Image } from '@/components';
import { range } from 'ramda';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';
import { useBoardValueSetter } from '@/hooks/useBoardValue';

export const InvestigatorSanity = () => {
  const [sanity, setSanity, maxSanity] = useBoardValueSetter('sanity');
  const values = range(0, maxSanity + 1);

  return (
    <InvestigatorStat
      containerClassName={S.container}
      className={S.picker}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={sanity}
      values={values}
      onChange={setSanity}
      >
      <Image
        className={S.background}
        src={background}
      />
    </InvestigatorStat>
  );
}
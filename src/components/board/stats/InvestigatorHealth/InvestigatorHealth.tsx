import S from './InvestigatorHealth.module.scss';
import { Image } from '@/components';
import { range } from 'ramda';
import background from './images/health.png';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';
import { useBoardValue } from '@/hooks/useBoardValue';

export const InvestigatorHealth = () => {
  const [health, setHealth, maxHealth] = useBoardValue('health');
  const values = range(0, maxHealth + 1);

  return (
    <InvestigatorStat
      containerClassName={S.container}
      className={S.picker}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={health}
      values={values}
      onChange={setHealth}
      >
      <Image
        className={S.background}
        src={background}
      />
    </InvestigatorStat>
  );
}
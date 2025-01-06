import S from './InvestigatorResources.module.scss';
import { Image } from '@/components';
import background from './images/resource.png';
import { range } from 'ramda';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';
import { useBoardValueSetter } from '@/hooks/useBoardValue';

export const InvestigatorResources = () => {
  const [resources, setResources] = useBoardValueSetter('resources');

  return (
    <InvestigatorStat
      className={S.picker}
      containerClassName={S.container}
      activeClassName={S.active}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={resources}
      values={range(0, 100)}
      onChange={setResources}
    >
      <Image
        className={S.background}
        src={background}
      />
    </InvestigatorStat>
  );
}

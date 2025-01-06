import S from './InvestigatorClues.module.scss';
import { Image } from '@/components';
import { range } from 'ramda';
import background from './images/clue.svg';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';
import { useBoardValue } from '@/hooks/useBoardValue';

const CLUE_VALUES = range(0, 100);

export const InvestigatorClues = () => {
  const [clues, setClues] = useBoardValue('clues');

  return (
    <InvestigatorStat
      className={S.picker}
      containerClassName={S.container}
      activeClassName={S.active}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={clues}
      values={CLUE_VALUES}
      onChange={setClues}
    >
      <Image
        className={S.background}
        src={background}
      />
    </InvestigatorStat>
  );
}

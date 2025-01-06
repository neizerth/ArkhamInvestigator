import S from './InvestigatorActions.module.scss';
import { Block, Icon } from '@/components';
import { range } from 'ramda';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';
import { useBoardValueSetter } from '@/hooks/useBoardValue';

export const InvestigatorActions = () => {
  const [actions, setActions, defaultActions] = useBoardValueSetter('actions');

  const makeAction = () => {
    const nextValue = actions === 0 ? defaultActions : actions - 1;

    setActions(nextValue);
  }

  return (
    <InvestigatorStat
      containerClassName={S.container}
      valueClassName={S.value}
      selectedValueClassName={S.value_selected}
      inactiveValueClassName={S.value_inactive}
      value={actions}
      values={range(0, 31)}
      onChange={setActions}
      onAction={makeAction}
    >
      <Block className={S.background}>
        <Icon icon='action'/>
      </Block>
    </InvestigatorStat>
  );
}
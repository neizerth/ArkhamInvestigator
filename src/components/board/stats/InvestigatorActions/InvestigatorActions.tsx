import { useState } from 'react';
import S from './InvestigatorActions.module.scss';
import { Block, Icon } from '@/components';
import { range } from 'ramda';
import { BlockProps } from '@/components/ui/common/Block/Block';
import { InvestigatorStat } from '../common/InvestigatorStat/InvestigatorStat';

export type InvestigatorActionsProps = BlockProps & {
  value: number
}

export const InvestigatorActions = ({
  value
}: InvestigatorActionsProps) => {
  const [actions, setActions] = useState(value);

  const makeAction = () => {
    const nextValue = actions === 0 ? value : actions - 1;

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
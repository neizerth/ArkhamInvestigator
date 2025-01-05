import S from './InvestigatorHealth.module.scss';
import { Block, Image } from '@/components';
import { InvestigatorStatPicker } from '../common/InvestigatorStatPicker/InvestigatorStatPicker';
import { range } from 'ramda';
import { useState } from 'react';
import { BlockProps } from '@/components/ui/common/Block/Block';
import background from './images/health.png';
import { withActiveClassName } from '@/components/hoc/withActiveClassName';
import { ValuePickerValue } from '@/components/interaction/picker/ValuePickerValue/ValuePickerValue';

export type InvestigatorHealthProps = BlockProps & {
  value: number
}

export const InvestigatorHealth = ({
  value,
  ...props
}: InvestigatorHealthProps) => {
  const [health, setHealth] = useState(value);

  const decHealth = () => {
    if (health <= 0) {
      return;
    }
    setHealth(health - 1);
  }

  return (
    <Block {...props}>
      <Block className={S.container}>
        <Image 
          className={S.background}
          src={background}
        />

        <Block className={S.picker}>
          <InvestigatorStatPicker
            value={health}
            values={range(0, value + 1)}
            onChange={setHealth}
            selectedValueClassName={S.selectedValue}
            inactiveValueClassName={S.inactiveValue}
            onAction={decHealth}
            itemHeight={50}
            components={{
              Value: HealthValue
            }}
          />
        </Block>
      
      </Block>
    </Block>
  );
}

const HealthValue = withActiveClassName({
  Component: ValuePickerValue,
  prop: 'selected',
  activeClassName: S.value_selected,
  inactiveClassName: S.value_inactive,
});
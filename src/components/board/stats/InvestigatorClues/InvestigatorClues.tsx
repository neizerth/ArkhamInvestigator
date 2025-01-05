import { BlockProps } from '@/components/ui/common/Block/Block';
import S from './InvestigatorClues.module.scss';
import { Image, Block } from '@/components';
import { useState } from 'react';
import { InvestigatorStatPicker } from '../common/InvestigatorStatPicker/InvestigatorStatPicker';
import { range } from 'ramda';
import { ValuePickerValue } from '@/components/interaction/picker/ValuePickerValue/ValuePickerValue';
import { withActiveClassName } from '@/components/hoc/withActiveClassName';
import background from './images/clue.svg';

export type InvestigatorCluesProps = BlockProps & {
  value: number;
}

export const InvestigatorClues = ({
  value,
  ...props
}: InvestigatorCluesProps) => {
  const [clues, setClues] = useState(value);

  const decClues = () => {
    if (clues === 0) {
      return;
    }

    setClues(clues - 1);
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
            value={clues}
            values={range(0, 100)}
            onChange={setClues}
            onAction={decClues}
            selectedValueClassName={S.selectedValue}
            inactiveValueClassName={S.inactiveValue}
            itemHeight={50}
            components={{
              Value: CluesValue
            }}
          />
        </Block>
      
      </Block>
    </Block>
  );
}

const CluesValue = withActiveClassName({
  Component: ValuePickerValue,
  prop: 'selected',
  activeClassName: S.value_selected,
  inactiveClassName: S.value_inactive,
});
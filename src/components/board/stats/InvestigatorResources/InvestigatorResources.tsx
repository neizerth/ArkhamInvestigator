import { BlockProps } from '@/components/ui/common/Block/Block';
import S from './InvestigatorResources.module.scss';
import { Block, Image } from '@/components';
import background from './images/resource.png';
import { InvestigatorStatPicker } from '../common/InvestigatorStatPicker/InvestigatorStatPicker';
import { useState } from 'react';
import { range } from 'ramda';
import { withActiveClassName } from '@/components/hoc/withActiveClassName';
import { ValuePickerValue } from '@/components/interaction/picker/ValuePickerValue/ValuePickerValue';

export type InvestigatorResourcesProps = BlockProps & {
  value: number;
}

export const InvestigatorResources = ({
  value,
  ...props
}: InvestigatorResourcesProps) => {

  const [resources, setResources] = useState(value);

  const decResources = () => {
    if (resources === 0) {
      return;
    }
    setResources(resources - 1);
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
            value={resources}
            values={range(0, value + 1)}
            onChange={setResources}
            onAction={decResources}
            selectedValueClassName={S.selectedValue}
            inactiveValueClassName={S.inactiveValue}
            itemHeight={50}
            components={{
              Value: ResourcesValue
            }}
          />
        </Block>
      
      </Block>
    </Block>
  );
}


const ResourcesValue = withActiveClassName({
  Component: ValuePickerValue,
  prop: 'selected',
  activeClassName: S.value_selected,
  inactiveClassName: S.value_inactive,
});
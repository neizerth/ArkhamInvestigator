import { Block } from '@/components/ui/common/Block/Block';
import S from './InvestigatorStat.module.scss';
import { PropsWithChildren, useState } from 'react';
import { InvestigatorStatPicker } from '../InvestigatorStatPicker/InvestigatorStatPicker';
import classNames from 'classnames';
import { ValuePickerProps } from '@/components/interaction/picker/ValuePicker/ValuePicker';
import { ValuePickerFixedValue } from '@/components/interaction/picker/ValuePickerValue/ValuePickerValue';
import { last } from 'ramda';

export type InvestigatorStatProps = ValuePickerProps & PropsWithChildren & {
  containerClassName?: string
}

export const InvestigatorStat = ({
  children,
  containerClassName,
  ...props
}: InvestigatorStatProps) => {
  const {
    value,
    values,
    onChange,
  } = props;

  const decValue = () => {
    if (value === 0) {
      return;
    }

    onChange(value - 1);
  }

  const incValue = () => {
    const max = last(values);
    if (!max) {
      return;
    }
    if (value === max) {
      return;
    }
    onChange(value + 1);
  }

  return (
    <Block 
      className={classNames(
        S.container,
        containerClassName
      )}
    >
      {children}

      <Block className={S.picker}>
        <InvestigatorStatPicker
          itemHeight={50}
          onAction={decValue}
          onSpecialAction={incValue}
          components={{
            Value: ValuePickerFixedValue,
          }}
          {...props}
          activeClassName={classNames(
            S.active,
            props.activeClassName
          )}
          valueClassName={S.value}
        />
      </Block>
    
    </Block>
  );
}

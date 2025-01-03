import Picker, { PickerProps } from 'react-mobile-picker';
import S from './ValuePicker.module.scss';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { PropsWithClassName } from '@/types/ui';

type PickerValue = Record<string, number>

export type ValueProps = PropsWithClassName & {
  value: number
  selected?: boolean
}

export type ValuePickerProps = Omit<PickerProps<PickerValue>, 'value' | 'onChange'> & {
  activeClassName?: string
  valueClassName?: string
  columnClassName?: string
  value: number
  values: number[]
  onChange: (value: number) => void
  components?: {
    Value: FC<ValueProps>
  }
}


export const ValuePicker = ({
  activeClassName,
  valueClassName,
  columnClassName,
  value,
  values,
  components,
  onChange,
  ...props
}: ValuePickerProps) => {
  const [isActive, setIsActive] = useState(false);
  const activate = () => setIsActive(true);
  const deactivate = () => setIsActive(false);

  const Value = components?.Value || React.Fragment;

  useEffect(() => {
    document.addEventListener('touchend', deactivate)

    return () => {
      document.removeEventListener('touchend', deactivate)
    }
  });

  return (
    <Picker
      {...props}
      value={{ value }}
      onChange={({ value }) => onChange(value)}
      wheelMode="natural"
      className={classNames(
        S.picker,
        isActive && activeClassName,
        props.className
      )}
      onTouchStart={activate}
    >
      <Picker.Column name="value" className={classNames(
        S.column,
        columnClassName
      )}>
        {values.map(num => (
          <Picker.Item 
            key={num} 
            value={num}
          >
            <Value
              value={num} 
              selected={num === value}
              className={classNames(
                S.value,
                valueClassName,
                num === value && S.value_selected
              )}
            />
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  );
}

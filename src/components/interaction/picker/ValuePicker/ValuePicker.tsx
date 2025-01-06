import Picker, { PickerProps } from 'react-mobile-picker';
import S from './ValuePicker.module.scss';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { ValuePickerValue } from '../ValuePickerValue/ValuePickerValue';
import { delay } from '@/features/units/time';

type PickerValue = Record<string, number>

export type ValueProps = {
  value: number
  selected?: boolean
}

export type ValuePickerProps = Omit<PickerProps<PickerValue>, 'value' | 'onChange'> & {
  activeClassName?: string
  selectedValueClassName?: string
  inactiveValueClassName?: string
  valueClassName?: string
  columnClassName?: string
  value: number
  values: number[]
  onChange: (value: number) => void
  onAction?: () => void
  onSpecialAction?: () => void
  components?: {
    Value: FC<ValueProps>
  }
}

export const ValuePicker = ({
  valueClassName,
  inactiveValueClassName,
  selectedValueClassName,
  activeClassName,
  columnClassName,
  value,
  values,
  components,
  onAction,
  onSpecialAction,
  onChange,
  ...props
}: ValuePickerProps) => {

  const Value = components?.Value || ValuePickerValue;

  const [isActive, setIsActive] = useState(false);

  const changeTrigger = useRef(false);
  const actionTrigger = useRef(true);

  const activate = () => {
    if (isActive) {
      return;
    }
    setIsActive(true);
    actionTrigger.current = true;
  }
  
  const deactivate = async () => {
    if (!isActive) {
      return;
    }
    setIsActive(false);

    if (!onAction) {
      return;
    }

    await delay(10);

    if (changeTrigger.current || !actionTrigger.current) {
      changeTrigger.current = false;
      return;
    }
    
    onAction();
  };

  const cancelAction = () => {
    actionTrigger.current = false;
  }

  const handleChange = (value: number) => {
    onChange(value);

    changeTrigger.current = true;
  }
  
  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    actionTrigger.current = false;
    if (!onSpecialAction) {
      return;
    }
    onSpecialAction();
    deactivate();
  }

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
      onChange={({ value }) => handleChange(value)}
      wheelMode="natural"
      className={classNames(
        S.picker,
        isActive && activeClassName,
        props.className
      )}
      onTouchStart={activate}
      onTouchMove={cancelAction}
      onContextMenu={onContextMenu}
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
                valueClassName,
                num === value? selectedValueClassName : inactiveValueClassName
              )}
            />
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  );
}

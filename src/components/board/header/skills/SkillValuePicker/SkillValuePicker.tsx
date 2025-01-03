import { FontNumber } from '@/components/ui/icons/FontNumber/FontNumber';
import { range } from 'ramda';
import S from './SkillValuePicker.module.scss';
import Picker, { PickerProps } from 'react-mobile-picker'
import classNames from 'classnames';
import { useEffect, useState } from 'react';

type SkillPickerValue = Record<string, number>

export type SkillValuePickerProps = Omit<PickerProps<SkillPickerValue>, 'value' | 'onChange'> & {
  value: number;
  onChange: (value: number) => void;
}

const values = range(-30, 31);

export const SkillValuePicker = ({
  value,
  onChange,
  ...props
}: SkillValuePickerProps) => {
  const [isActive, setIsActive] = useState(false);
  const activate = () => setIsActive(true);
  const deactivate = () => setIsActive(false);

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
        isActive && S.active,
        props.className
      )}
      onTouchStart={activate}
    >
      <Picker.Column name="value" className={S.column}>
        {values.map(num => (
          <Picker.Item 
            key={num} 
            value={num}
          >
            <SkillValue 
              value={num} 
              selected={num === value}
            />
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  );
}

export const SkillValue = ({ 
  value,
  selected
}: {
  value: number
  selected: boolean
}) => {

  return (
    <FontNumber
      className={classNames(
        S.value,
        value > 9 && S.value_2digits,
        value < 0 && S.value_2digits,
        value < -9 && S.value_3digits,
        selected ? S.value_selected : S.value_inactive
      )}
      value={value}
    />
  )
}

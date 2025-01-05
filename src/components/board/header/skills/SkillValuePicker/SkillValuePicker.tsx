import { FontNumber } from '@/components/ui/icons/FontNumber/FontNumber';
import { range } from 'ramda';
import S from './SkillValuePicker.module.scss';
import classNames from 'classnames';
import { ValuePicker, ValuePickerProps, ValueProps } from '@/components/interaction/picker/ValuePicker/ValuePicker';

export type SkillValuePickerProps = ValuePickerProps;

const values = range(-30, 31);

export const SkillValuePicker = (props: SkillValuePickerProps) => {
  return (
    <ValuePicker
      {...props}
      values={values}
      activeClassName={S.active}
      columnClassName={S.column}
      className={classNames(
        S.picker,
        props.className
      )}
      components={{
        Value: SkillValue
      }}
    />
  );
}

export const SkillValue = ({ 
  value,
  selected
}: ValueProps) => {

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

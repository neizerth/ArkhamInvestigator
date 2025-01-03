import S from './InvestigatorStatPicker.module.scss';
import classNames from 'classnames';
import { FontNumber, ValuePicker } from '@/components';
import { Block } from '@/components';
import { ValuePickerProps, ValueProps } from '@/components/interaction/ValuePicker/ValuePicker';

export type SkillValuePickerProps = ValuePickerProps;

export const InvestigatorStatPicker = (props: SkillValuePickerProps) => {
  return (
    <ValuePicker
      {...props}
      className={classNames(
        S.picker,
        props.className
      )}
      components={{
        Value: StatValue
      }}
    />
  );
}

export const StatValue = ({ 
  value,
  selected,
  className
}: ValueProps) => {
  return (
    <Block className={S.valueContainer}>
      <FontNumber
        className={classNames(
          S.value,
          className,
          value > 9 && S.value_2digits,
          value < 0 && S.value_2digits,
          value < -9 && S.value_3digits,
          selected ? S.value_selected : S.value_inactive
        )}
        value={value}
      />
    </Block>
  )
}

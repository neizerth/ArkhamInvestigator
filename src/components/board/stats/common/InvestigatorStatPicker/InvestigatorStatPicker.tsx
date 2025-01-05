import S from './InvestigatorStatPicker.module.scss';
import classNames from 'classnames';
import { ValuePicker } from '@/components';
import { ValuePickerProps } from '@/components/interaction/picker/ValuePicker/ValuePicker';

export type SkillValuePickerProps = ValuePickerProps;

export const InvestigatorStatPicker = (props: SkillValuePickerProps) => {
  return (
    <ValuePicker
      {...props}
      className={classNames(
        S.picker,
        props.className
      )}
      activeClassName={classNames(
        S.active,
        props.activeClassName
      )}
      valueClassName={classNames(
        S.value,
        props.valueClassName
      )}
      inactiveValueClassName={classNames(
        S.value_inactive,
        props.inactiveValueClassName
      )}
      selectedValueClassName={classNames(
        S.value_selected,
        props.selectedValueClassName
      )}
    />
  );
}

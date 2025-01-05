import S from './ValuePickerValue.module.scss';
import classNames from 'classnames';
import { FontNumber } from '@/components/ui/icons/FontNumber/FontNumber';
import { BlockProps } from '@/components/ui/common/Block/Block';
import { ValueProps } from '../ValuePicker/ValuePicker';

export type ValuePickerValueProps = BlockProps & ValueProps;

export const ValuePickerValue = ({
  selected = false,
  value,
  className
}: ValuePickerValueProps) => {
  const digitsCount = [...value.toString()].length;

  return (
    <FontNumber
      className={classNames(
        S.value,
        S[`size_${digitsCount}`],
        selected ? S.selected : S.inactive,
        className
      )}
      value={value}
    />
  )
}
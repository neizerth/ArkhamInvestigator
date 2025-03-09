import { useCallback } from 'react';
import type { PickerItemProps, PickerProps } from '../../features/HapticPicker';
import * as C from './StatPicker.components';
import type { ValueProps } from '../Value';

export type StatPickerProps = Omit<PickerProps, 'renderItem'> & {
  valueStyle?: ValueProps['style']
}

export const StatPicker = ({
  valueStyle,
  ...props
}: StatPickerProps) => {
  const renderItem = useCallback((props: PickerItemProps) => {
    const { item } = props;
    return (
      <C.Item>
        <C.Value
          {...props}
          value={item.value}
          style={valueStyle}
        />
      </C.Item>
    )
  }, [valueStyle]);

  return (
    <C.Picker
      {...props}
      renderItem={renderItem}
    />
  );
}

import { ReactElement, useRef } from 'react';
import * as C from './Picker.components';
import { PickerList } from './PickerList';
import type { PickerProps } from './Picker.types';

export * from './Picker.types'

export const Picker = ({
  value,
  data,
  onValueChanged,
  renderItem,
  renderItemContainer,
  itemHeight,
  itemContainerStyle,
  ...restProps
}: PickerProps) => {
  const listRef = useRef(null);
  return (
    <C.Container {...restProps}>
      <PickerList
        listRef={listRef}
        value={value}
        data={data}
        onChange={onValueChanged}
        renderItem={renderItem}
        renderItemContainer={renderItemContainer}
        itemHeight={itemHeight}
        itemContainerStyle={itemContainerStyle}
      />  
    </C.Container>
  );
}
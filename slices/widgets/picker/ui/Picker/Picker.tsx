import { useRef } from 'react';
import * as C from './Picker.components';
import { PickerList } from '../PickerList';
import type { PickerProps } from '@widgets/picker/model';

export const Picker = ({
  value,
  data,
  onValueChanged,
  renderItem,
  renderItemContainer,
  itemHeight = 24,
  itemContainerStyle,
  visibleItemsCount,
  listStyle,
  onLongPress,
  delayLongPress,
  ...restProps
}: PickerProps) => {
  return (
    <C.Container {...restProps}>
      <PickerList
        value={value}
        data={data}
        onChange={onValueChanged}
        renderItem={renderItem}
        renderItemContainer={renderItemContainer}
        itemHeight={itemHeight}
        itemContainerStyle={itemContainerStyle}
        visibleItemsCount={visibleItemsCount}
        style={listStyle}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
      />  
    </C.Container>
  );
}
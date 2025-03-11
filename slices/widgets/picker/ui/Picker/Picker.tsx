import { memo, useRef } from 'react';
import * as C from './Picker.components';
import { PickerListMemo as PickerList } from '../PickerList';
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
  onPress,
  delayLongPress,
  gap,
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
        onPress={onPress}
        delayLongPress={delayLongPress}
        gap={gap}
      />  
    </C.Container>
  );
}

export const PickerMemo = memo(Picker);
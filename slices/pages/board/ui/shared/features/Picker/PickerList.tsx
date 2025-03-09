import { FlatListProps } from 'react-native';
import * as C from './Picker.components';
import type { PickerListProps } from './Picker.types';

export const PickerList = ({
  itemContainerStyle,
  data = [],
  listRef,
  ...props
}: PickerListProps) => {

  // const renderItem = 
  return (
    <C.List
      {...props}
      data={data}
      ref={listRef}
    />
  )
}
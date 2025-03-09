import { impactHapticFeedback } from '@features/haptic';
import * as C from './Picker.components';
import type { RenderListProps, RenderItemProps, ValueChangedEvent, WheelPickerProps } from '@quidone/react-native-wheel-picker';
import List from '@quidone/react-native-wheel-picker/src/base/list/List';

import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { Defined } from '@shared/model';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

export type PickerItem = {
  value: number
}

export type PickerValueChangedEvent = ValueChangedEvent<PickerItem>

export type PickerItemProps = RenderItemProps<PickerItem>

export type PickerListProps = RenderListProps<PickerItem>

type BasePickerProps = WheelPickerProps<PickerItem>;

export type PickerProps = Omit<BasePickerProps, 'data' | 'renderItem'> & {
  data: number[]
  containerStyle?: ViewStyle
  renderItem: (props: PickerItemProps) => React.ReactElement | null
}

const onValueChanging = () => impactHapticFeedback('effectTick');

export const Picker = ({
  containerStyle,
  ...props
}: PickerProps) => {
  const [isPickerActive, setPickerActive] = useState(false);

  const currentValue = props.value;
  const data = props.data
    .map(value => ({
      value
    }))

  const onValueChanged = useCallback((event: PickerValueChangedEvent) => {
    impactHapticFeedback('selection');
    setPickerActive(false);
    console.log('onValueChanged')

    props.onValueChanged?.(event);
  }, [props.onValueChanged]);

  const renderList = useCallback((props: PickerListProps) => {

    const onLongTouch = () => {
      console.log('onLongTouch');
    }
    const onTouch = () => {
      console.log('onTouch');
    }
    const touchProps = {
      onLongTouch,
      onTouch
    }
    return (
      <List
        {...props}
        {...touchProps}
      />
    )  
  }, []);

  const overlayItemStyle = {
    // opacity: 1
  }

  return (
    <C.Picker
      onValueChanging={onValueChanging}
      {...props}
      onValueChanged={onValueChanged}
      data={data}
      renderList={renderList}
      visibleItemCount={1}
      overlayItemStyle={overlayItemStyle}
    />
  );
}
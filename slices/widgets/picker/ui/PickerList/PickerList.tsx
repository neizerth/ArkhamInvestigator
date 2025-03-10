import type { FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import * as C from './PickerList.components';
import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { useBoolean } from '@shared/lib/hooks';
import type { PickerListProps } from '@widgets/picker/model';
import { defaultRenderItemContainer } from './defaultRenderItemContainer';
import { safeIndexOf } from '@shared/lib';
import { impactHapticFeedback } from '@features/haptic';
import { times } from 'ramda';
import { MIN_FINGER_SIZE } from '@widgets/picker/config';

type ListScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

const tick = () => impactHapticFeedback('effectTick');

export const PickerList = ({
  itemContainerStyle,
  data = [],
  value,
  renderItem,
  renderItemContainer = defaultRenderItemContainer,
  visibleItemsCount = 3,
  onChange,
  delayLongPress = 500,
  onLongPress,
  gap = MIN_FINGER_SIZE,
  ...props
}: PickerListProps) => {
  const [activated, setActivity] = useBoolean(false);
  const longPressTimeout = useRef<NodeJS.Timeout>();
  const index = useRef(0);
  const listRef = useRef<FlatList>(null);

  const itemHeight = props.itemHeight + gap;

  const renderListItem = useCallback((info: ListRenderItemInfo<number>) => {
    return renderItemContainer({
      ...info,
      itemHeight,
      renderItem,
      currentValue: value
    })
  }, [itemHeight, renderItemContainer, renderItem, value]);

  const defaultIndex = Math.max(
    safeIndexOf(value, data),
    0
  );

  const defaultOffset = defaultIndex * itemHeight;

  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    
    listRef.current.scrollToOffset({
      offset: defaultOffset,
      animated: true
    });
    
  }, [defaultOffset]);

  const snapToOffsets = useMemo(
    () => data.map((_, i) => i * itemHeight),
    [data, itemHeight],
  );


  const onScrollEnd = useCallback(() => {

    const nextValue = data[index.current];

    if (value === nextValue) {
      return;
    }

    onChange?.({
      value: nextValue,
      index: index.current
    })
  }, [data, onChange, value])

  const onScroll = useCallback((e: ListScrollEvent) => {
    const offset = e.nativeEvent.contentOffset.y;
    const scrollIndex = Math.round(offset / itemHeight);

    const n = Math.abs(index.current - scrollIndex);

    index.current = scrollIndex;

    if (!activated) {
      return;
    }
    
    times(tick, n);
  }, [itemHeight, activated]);

  const onTouchStart = useCallback(() => {
    setActivity.on();

    if (!onLongPress) {
      return;
    }
    longPressTimeout.current = setTimeout(() => {
      tick();
      onLongPress();
    }, delayLongPress);
  }, [setActivity, onLongPress, delayLongPress]);

  const onTouchEnd = useCallback(() => {
    if (!longPressTimeout.current) {
      return;
    }
    clearTimeout(longPressTimeout.current);
  }, []);

  const style = {
    height: itemHeight,
  }

  return (
    <C.List
      data={data}
      ref={listRef}
      renderItem={renderListItem}
      style={[
        props.style,
        style
      ]}
      contentContainerStyle={[
        props.contentContainerStyle,
      ]}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMomentumScrollEnd={onScrollEnd}
      onScroll={onScroll}
      snapToOffsets={snapToOffsets}
      showsVerticalScrollIndicator={false}
    />
  )
}
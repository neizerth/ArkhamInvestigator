import type { FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import * as C from './PickerList.components';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useBooleanRef } from '@shared/lib/hooks';
import type { PickerListProps } from '@widgets/picker/model';
import { defaultRenderItemContainer } from './defaultRenderItemContainer';
import { safeIndexOf } from '@shared/lib';
import { impactHapticFeedback, tickFeedback } from '@features/haptic';
import { times } from 'ramda';
import { MIN_FINGER_SIZE } from '@widgets/picker/config';

type ListScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

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
  onPress,
  gap = 0,
  ...props
}: PickerListProps) => {
  const activated = useRef(false);
  const canPress = useRef(false);
  const uiSync = useRef(false);
  
  const longPressTimeout = useRef<NodeJS.Timeout>();

  const index = useRef(0);
  const listRef = useRef<FlatList>(null);

  const itemHeight = props.itemHeight + gap;

  useEffect(() => {
    activated.current = false;
    canPress.current = false;
    uiSync.current = false;
  }, [])

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

  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    if (index.current === defaultIndex) {
      return;
    }
    uiSync.current = true;

    listRef.current?.scrollToIndex({
      index: defaultIndex,
      animated: true
    });
  }, [defaultIndex]);

  const snapToOffsets = useMemo(
    () => data.map((_, i) => i * itemHeight),
    [data, itemHeight],
  );

  const onScrollEnd = useCallback(() => {
    
    const nextValue = data[index.current];

    activated.current = false;
    
    if (uiSync.current) {
      uiSync.current = false;
      return;
    }

    if (value === nextValue) {
      return;
    }

    onChange?.({
      value: nextValue,
      index: index.current
    })

    
  }, [data, onChange, value])

  const onScroll = useCallback((e: ListScrollEvent) => {
    canPress.current = false;
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
    const offset = e.nativeEvent.contentOffset.y;
    const scrollIndex = Math.round(offset / itemHeight);

    const n = Math.abs(index.current - scrollIndex);

    index.current = scrollIndex;

    if (!activated.current) {
      return;
    }
    
    times(tickFeedback, n);
  }, [itemHeight]);

  const onTouchStart = useCallback(() => {
    activated.current = true;
    canPress.current = true;
    uiSync.current = false;

    if (!onLongPress) {
      return;
    }
    longPressTimeout.current = setTimeout(() => {
      if (!canPress.current) {
        return;
      }
      activated.current = false
      canPress.current = false;
      tickFeedback();
      onLongPress();
    }, delayLongPress);
    
  }, [onLongPress, delayLongPress]);

  const onTouchEnd = useCallback(() => {

    activated.current = false;
    if (canPress.current && onPress) {
      clearTimeout(longPressTimeout.current);

      tickFeedback();
      onPress()

      activated.current = false;
      canPress.current = false;

      return;
    }

    if (!longPressTimeout.current) {
      return;
    }
    clearTimeout(longPressTimeout.current);
  }, [onPress]);

  const getItemLayout = useCallback((_, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index: index,
  }), [itemHeight])

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
      keyExtractor={(item) => item.toString()}
      getItemLayout={getItemLayout}
      initialScrollIndex={defaultIndex}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMomentumScrollEnd={onScrollEnd}
      onScroll={onScroll}
      snapToOffsets={snapToOffsets}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
    />
  )
}

export const PickerListMemo = memo(PickerList);
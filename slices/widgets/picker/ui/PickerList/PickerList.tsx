import type { FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import * as C from './PickerList.components';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useBooleanRef } from '@shared/lib/hooks';
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
  onPress,
  gap = 0,
  ...props
}: PickerListProps) => {
  const [activated, setActivity] = useBooleanRef(false)
  const longPressTimeout = useRef<NodeJS.Timeout>();
  const [canPress, setCanPressed] = useBooleanRef(false);

  const index = useRef(0);
  const listRef = useRef<FlatList>(null);

  const itemHeight = props.itemHeight + gap;

  useEffect(() => {
    setActivity.off()
    return () => {
      setActivity.off()
    }
  }, [setActivity])

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

    if (!activated.current) {
      return;
    }
    
    const nextValue = data[index.current];

    if (value === nextValue) {
      return;
    }
    
    onChange?.({
      value: nextValue,
      index: index.current
    })

    setActivity.off();
  }, [data, onChange, value, setActivity, activated])

  const onScroll = useCallback((e: ListScrollEvent) => {
    setCanPressed.off();

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
    
    times(tick, n);
  }, [itemHeight, activated, setCanPressed]);

  const onTouchStart = useCallback(() => {
    setActivity.on();
    setCanPressed.on();

    if (!onLongPress) {
      return;
    }
    longPressTimeout.current = setTimeout(() => {
      if (!canPress.current) {
        return;
      }
      setCanPressed.off()
      setActivity.off();

      tick();
      onLongPress();
    }, delayLongPress);
    
  }, [setActivity, onLongPress, delayLongPress, setCanPressed, canPress]);

  const onTouchEnd = useCallback(() => {
    if (canPress.current && onPress) {
      clearTimeout(longPressTimeout.current);

      setCanPressed.off()
      setActivity.off();
      tick();
      onPress()

      return;
    }

    if (!longPressTimeout.current) {
      return;
    }
    clearTimeout(longPressTimeout.current);
  }, [canPress, setCanPressed, onPress, setActivity]);

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
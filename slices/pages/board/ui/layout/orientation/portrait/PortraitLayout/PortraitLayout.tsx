import type { RowProps } from '@shared/ui';
import * as C from './PortraitLayout.components';
import { Actions, Health, Sanity } from '../../../shared/stats';
import { useCallback, useContext, useEffect, useState } from 'react';
import { LayoutContext, PortraitLayoutContext } from '@pages/board/config';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { selectShowDescription, setShowDescription, useAppDispatch, useAppSelector } from '@shared/lib';

export type PortraitLayoutProps = RowProps & {
  top: number
}

export const PortraitLayout = ({
  top,
  ...props
}: PortraitLayoutProps) => {
  const { view } = useContext(LayoutContext);
  const dispatch = useAppDispatch();
  const showDescription = useAppSelector(selectShowDescription);
  const opacity = useSharedValue(0);

  const height = view.height - top;

  const contextValue = {
    height
  }

  const offset = { top }

  useEffect(() => {
    opacity.value = showDescription ? 1 : 0;
  }, [opacity, showDescription])

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 300
      }),
    };
  });

  const hideDescription = useCallback(() => {
    dispatch(setShowDescription(false));
  }, [dispatch]);
  return (
    <PortraitLayoutContext.Provider value={contextValue}>
      <C.Container {...props}>
        <C.RightSidebar view={view} style={offset}/>
        <C.LeftSidebar view={view} style={offset}/>
        <C.Footer/>
        {showDescription && (
          <C.Overlay style={overlayStyle}>
            <C.OverlayArea 
              style={StyleSheet.absoluteFill} 
              onPress={hideDescription}
            />
          </C.Overlay>
        )}
      </C.Container>
    </PortraitLayoutContext.Provider>
  );
}
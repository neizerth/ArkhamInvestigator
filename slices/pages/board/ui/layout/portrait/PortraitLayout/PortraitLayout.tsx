import type { RowProps } from '@shared/ui';
import * as C from './PortraitLayout.components';
import { Actions, Health, Sanity } from '../../../stats';
import { useContext, useEffect, useState } from 'react';
import { LayoutContext, PortraitLayoutContext } from '@pages/board/config';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type PortraitLayoutProps = RowProps & {
  top: number
}

export const PortraitLayout = ({
  top,
  ...props
}: PortraitLayoutProps) => {
  const { view } = useContext(LayoutContext);
  const [showDescription, setShowDescription] = useState(false);
  const opacity = useSharedValue(0);

  const height = view.height - top;

  const contextValue = {
    height,
    showDescription,
    setShowDescription
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

  return (
    <PortraitLayoutContext.Provider value={contextValue}>
      <C.Container {...props}>
        <C.RightSidebar view={view} style={offset}/>
        <C.LeftSidebar view={view} style={offset}/>
        <C.Footer/>
        {showDescription && (
          <C.Overlay style={overlayStyle}/>
        )}
      </C.Container>
    </PortraitLayoutContext.Provider>
  );
}
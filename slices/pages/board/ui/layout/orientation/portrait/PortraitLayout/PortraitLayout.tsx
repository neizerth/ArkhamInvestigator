import type { RowProps } from '@shared/ui';
import * as C from './PortraitLayout.components';
import { useCallback, useContext } from 'react';
import { LayoutContext, PortraitLayoutContext } from '@pages/board/config';
import { StyleSheet } from 'react-native';
import { selectShowDescription, setShowDescription, useAppDispatch, useAppSelector } from '@shared/lib';
import { useOverlayStyle } from './useOverlayStyle';

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
  const height = view.height - top;

  const contextValue = {
    height
  }

  const offset = { top }

  const overlayStyle = useOverlayStyle()
  
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
import React from 'react';
import { selectShowDescription, useAppSelector, useLayoutSize, useScreenOrientation } from '@shared/lib';
import * as C from './BoardPage.components';
import { getHeaderLayout, selectBoard, useStatusBar } from '@pages/board/lib';
import { useWindowDimensions } from 'react-native';
import { LayoutContext } from '@pages/board/config/context';
import { servicePadding } from '@pages/board/config';
import { size } from '@shared/config';

export const BoardPage = () => {
  const board = useAppSelector(selectBoard);
  const window = useWindowDimensions();
  const orientation = useScreenOrientation();
  const showDescription = useAppSelector(selectShowDescription);
  useStatusBar();

  const [view, onLayout] = useLayoutSize(window);

  const layout = getHeaderLayout(view);

  const areaTop = layout.height + servicePadding[layout.type].top + size.gap.large;

  const contextValue = {
    view,
    layout
  }
  
  return (
    <LayoutContext.Provider value={contextValue}>
      {board && (
        <C.Container onLayout={onLayout}>
          <C.Header layout={layout} descriptionShown={showDescription}/>
          <C.Background/>
          {orientation.type === 'portrait' && (
            <C.PortraitLayout top={areaTop}/>
          )}
        </C.Container>
      )}
    </LayoutContext.Provider>
  );
}
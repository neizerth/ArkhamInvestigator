import { useAppSelector } from '@shared/lib';
import * as C from './BoardPage.components';
import { getHeaderLayout, selectBoard, useStatusBar } from '@pages/board/lib';
import { type LayoutChangeEvent, useWindowDimensions } from 'react-native';
import { Visible } from '@shared/ui';
import { useState } from 'react';
import type { Box } from '@shared/model';
import { LayoutContext } from '@pages/board/config/context';

export const BoardPage = () => {
  const board = useAppSelector(selectBoard);
  const window = useWindowDimensions();

  useStatusBar();
  
  const [view, setView] = useState<Box>(window);

  const onLayout = (e: LayoutChangeEvent) => {
    const { layout } = e.nativeEvent;

    setView(layout);
  }

  const layout = getHeaderLayout(view);

  const contextValue = {
    view,
    layout
  }
  
  return (
    <LayoutContext.Provider value={contextValue}>
      <C.Container onLayout={onLayout}>
        <Visible show={Boolean(board)}>
          <C.Header layout={layout}/>
          <C.Background/>
          <C.Footer/>
        </Visible>
      </C.Container>
    </LayoutContext.Provider>
  );
}
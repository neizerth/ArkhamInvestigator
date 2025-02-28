import { useAppSelector, useLayoutSize } from '@shared/lib';
import * as C from './BoardPage.components';
import { getHeaderLayout, selectBoard, useStatusBar } from '@pages/board/lib';
import { useWindowDimensions } from 'react-native';
import { Visible } from '@shared/ui';
import { LayoutContext } from '@pages/board/config/context';

export const BoardPage = () => {
  const board = useAppSelector(selectBoard);
  const window = useWindowDimensions();
  useStatusBar();

  const [view, onLayout] = useLayoutSize(window);

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
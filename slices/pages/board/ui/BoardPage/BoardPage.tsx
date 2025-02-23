import { useAppSelector } from '@shared/lib';
import * as C from './BoardPage.components';
import { getHeaderLayout, selectBoard } from '@pages/board/lib';
import { useWindowDimensions, View } from 'react-native';
import { Visible } from '@shared/ui';

export const BoardPage = () => {
  const board = useAppSelector(selectBoard);
  const window = useWindowDimensions();
  const layout = getHeaderLayout(window);

  return (
    <C.Container>
      <Visible show={Boolean(board)}>
        <C.Header layout={layout}/>
        <C.Background layout={layout}/>
      </Visible>
    </C.Container>
  );
}
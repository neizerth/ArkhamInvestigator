import { useAppSelector } from '@shared/lib';
import * as C from './BoardPage.components';
import { selectBoard } from '@pages/board/lib';
import { View } from 'react-native';
import { Visible } from '@shared/ui';

export const BoardPage = () => {
  const board = useAppSelector(selectBoard);

  return (
    <C.Container>
      <Visible show={Boolean(board)}>
        <C.Header/>
        <C.Background/>
      </Visible>
    </C.Container>
  );
}
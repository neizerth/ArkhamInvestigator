import { selectCurrentBoard, selectSkillCheckData, useAppSelector } from '@shared/lib';
import * as C from './ExpressionValue.components';
import { getValue } from './getValue';
import { last } from 'ramda';

export type ExpressionValueProps = {

}

export const ExpressionValue = ({}: ExpressionValueProps) => {

  const data = useAppSelector(selectSkillCheckData);
  const board = useAppSelector(selectCurrentBoard);

  if (!board) {
    return null;
  }

  const lastItem = last(data);
  const validData = lastItem?.type === 'operator' ? 
    data.slice(0, -1) : 
    data;

  const value = getValue({
    data: validData,
    value: board.value
  })

  return (
    <C.Container>
      <C.Value>
        {validData.length > 0 && `=${value}`}
      </C.Value>
    </C.Container>
  );
}
import { getSkillCheckValue, sanitizeSkillCheckExpression, selectCurrentBoard, selectSkillCheckData, useAppSelector } from '@shared/lib';
import * as C from './ExpressionValue.components';
import { last } from 'ramda';

export type ExpressionValueProps = {

}

export const ExpressionValue = ({}: ExpressionValueProps) => {

  const data = useAppSelector(selectSkillCheckData);
  const board = useAppSelector(selectCurrentBoard);

  if (!board) {
    return null;
  }

  const validData = sanitizeSkillCheckExpression(data);

  const value = getSkillCheckValue({
    data: validData,
    value: board.value
  })

  const showValue = validData.length > 0 && 
    !(validData.length === 1 && validData[0].type === 'number')

  return (
    <C.Container>
      <C.Value>
        {showValue && `=${value}`}
      </C.Value>
    </C.Container>
  );
}
import type { ClueProps } from '@shared/ui'
import * as C from './Clues.components'
import { selectCurrentBoard, useAppSelector } from '@shared/lib'
import { range } from 'ramda';

export const Clues = (props: ClueProps) => {
  const { value } = useAppSelector(selectCurrentBoard);
  return (
    <C.Container {...props}>
      <C.ValuePicker
        value={value.clues}
        data={range(0, 101)}
      />
      {/* <C.Value value={value.clues}/> */}
    </C.Container>
  )
}
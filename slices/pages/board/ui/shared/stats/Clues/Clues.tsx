import type { ClueProps } from '@shared/ui'
import * as C from './Clues.components'
import { selectCurrentBoard, useAppSelector } from '@shared/lib'

export const Clues = (props: ClueProps) => {
  const { value } = useAppSelector(selectCurrentBoard);
  return (
    <C.Container {...props}>
      <C.Value value={value.clues}/>
    </C.Container>
  )
}
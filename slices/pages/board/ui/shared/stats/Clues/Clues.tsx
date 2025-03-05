import type { ClueProps } from '@shared/ui'
import * as C from './Clues.components'
import { useAppSelector } from '@shared/lib'
import { selectBoard } from '@pages/board/lib'

export const Clues = (props: ClueProps) => {
  const { value } = useAppSelector(selectBoard);
  return (
    <C.Container {...props}>
      <C.Value value={value.clues}/>
    </C.Container>
  )
}
import type { HealthProps } from '@shared/ui'
import * as C from './Health.components'
import { useAppSelector } from '@shared/lib'
import { selectBoard } from '@pages/board/lib';

export const Health = (props: HealthProps) => {
  const { value } = useAppSelector(selectBoard);
  
  return (
    <C.Container {...props}>
      <C.Value value={value.health}/>
    </C.Container>
  )
}
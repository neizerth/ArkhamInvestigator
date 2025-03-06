import type { HealthProps } from '@shared/ui'
import * as C from './Health.components'
import { selectCurrentBoard, useAppSelector } from '@shared/lib'

export const Health = (props: HealthProps) => {
  const { value } = useAppSelector(selectCurrentBoard);
  
  return (
    <C.Container {...props}>
      <C.Value value={value.health}/>
    </C.Container>
  )
}
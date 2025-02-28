import type { RowProps } from '@shared/ui';
import * as C from './BoardFooter.components';
import { Actions, Health, Sanity } from '../../stats';

export type BoardFooterProps = RowProps

export const BoardFooter = ({
  ...props
}: BoardFooterProps) => {
  return (
    <C.Container {...props}>
      <C.Row>
        <Actions/>
        <C.Row>
          <Health />
          <Sanity />
        </C.Row>
      </C.Row>
      <C.Row>
        <C.Menu/>
      </C.Row>
    </C.Container>
  );
}
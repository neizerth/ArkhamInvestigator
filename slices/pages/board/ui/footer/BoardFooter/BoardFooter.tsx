import type { RowProps } from '@shared/ui';
import * as C from './BoardFooter.components';
import { Actions, Health, Sanity } from '../../stats';

export type BoardFooterProps = RowProps;

export const BoardFooter = ({
  ...props
}: BoardFooterProps) => {
  return (
    <C.Container {...props}>
      <C.Stats>
        <Actions/>
        <C.Row>
          <Health />
          <Sanity />
        </C.Row>
      </C.Stats>
      <C.Description/>
    </C.Container>
  );
}
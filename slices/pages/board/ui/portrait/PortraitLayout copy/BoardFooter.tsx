import type { RowProps } from '@shared/ui';
import * as C from './BoardFooter.components';
import { Actions, Health, Sanity } from '../../../stats';

export type PortraitLayoutProps = RowProps;

export const PortraitLayout = ({
  ...props
}: PortraitLayoutProps) => {
  return (
    <C.Container {...props}>
      <C.Stats>
        <Actions/>
        <C.MainStats>
          <Health />
          <Sanity />
        </C.MainStats>
      </C.Stats>
      <C.Description/>
    </C.Container>
  );
}
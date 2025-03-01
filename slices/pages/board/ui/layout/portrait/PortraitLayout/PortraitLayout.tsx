import type { RowProps } from '@shared/ui';
import * as C from './PortraitLayout.components';
import { Actions, Health, Sanity } from '../../../stats';

export type PortraitLayoutProps = RowProps;

export const PortraitLayout = ({
  ...props
}: PortraitLayoutProps) => {
  return (
    <C.Container {...props}>
      <C.RightSidebar/>
      <C.LeftSidebar/>
      <C.Footer/>
    </C.Container>
  );
}
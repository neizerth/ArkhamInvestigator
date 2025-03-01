import { Clues, Resources } from '@pages/board/ui/stats';
import * as C from './RightSidebar.components';
import { ViewProps } from 'react-native';

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({
  ...props
}: RightSidebarProps) => {
  return (
    <C.Container {...props}>
      <Clues/>
      <Resources/>
    </C.Container>
  );
}
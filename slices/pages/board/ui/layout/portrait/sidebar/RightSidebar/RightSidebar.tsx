import { Clues, Resources } from '@pages/board/ui/stats';
import * as C from './RightSidebar.components';
import type { ViewProps } from 'react-native';
import { useContext } from 'react';
import { PortraitLayoutContext } from '@pages/board/config';

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({
  ...props
}: RightSidebarProps) => {
  const { height } = useContext(PortraitLayoutContext);

  return (
    <C.Container 
      {...props} 
      unit={height}
    >
      <Clues/>
      <Resources/>
    </C.Container>
  );
}
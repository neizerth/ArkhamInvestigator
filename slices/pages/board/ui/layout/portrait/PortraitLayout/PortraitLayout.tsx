import type { RowProps } from '@shared/ui';
import * as C from './PortraitLayout.components';
import { Actions, Health, Sanity } from '../../../stats';
import { useContext } from 'react';
import { LayoutContext, PortraitLayoutContext } from '@pages/board/config';

export type PortraitLayoutProps = RowProps & {
  top: number
}

export const PortraitLayout = ({
  top,
  ...props
}: PortraitLayoutProps) => {
  const { view } = useContext(LayoutContext);

  const height = view.height - top;
  return (
    <PortraitLayoutContext.Provider value={{ height }}>
      <C.Container {...props}>
        <C.RightSidebar view={view}/>
        <C.LeftSidebar view={view}/>
        <C.Footer/>
      </C.Container>
    </PortraitLayoutContext.Provider>
  );
}
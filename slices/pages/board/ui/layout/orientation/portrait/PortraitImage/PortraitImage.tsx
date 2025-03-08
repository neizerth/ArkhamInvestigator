import { selectCurrentBoard, useAppSelector } from '@shared/lib';
import * as C from './PortraitImage.components';
import { getPortraitLayout } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import type { ViewProps } from 'react-native';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board/config';

export type PortraitImageProps = ViewProps;

export const PortraitImage = ({
  ...props
}: PortraitImageProps) => {
  const { view, layout } = useContext(LayoutContext);

  const { picture } = useAppSelector(selectCurrentBoard);
  
  const { id } = picture
  const uri = getInvestigatorImageUrl(id, 'full');

  const source = { uri };
  
  const imageLayout = getPortraitLayout({
    layout,
    view,
    picture
  });

  if (!imageLayout) {
    return null;
  }

  return (
    <C.Container {...props} layout={layout}>
      <C.Background 
        source={source}
        layout={imageLayout}
      />
    </C.Container>
  );
}
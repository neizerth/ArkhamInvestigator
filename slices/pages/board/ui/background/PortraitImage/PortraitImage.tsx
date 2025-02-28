import { useAppSelector } from '@shared/lib';
import * as C from './PortraitImage.components';
import { getPortraitLayout, selectBoard } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import type { Box } from '@shared/model';
import type { HeaderLayout } from '@pages/board/model';
import type { ViewProps } from 'react-native';

export type PortraitImageProps = ViewProps & {
  view: Box
  layout: HeaderLayout
}

export const PortraitImage = ({
  view,
  layout,
  ...props
}: PortraitImageProps) => {

  const { picture } = useAppSelector(selectBoard);
  
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
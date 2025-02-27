import { useAppSelector } from '@shared/lib';
import * as C from './LandscapeImage.components';
import { selectBoard } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import type { ImageProps } from 'react-native';
import type { HeaderLayout } from '@pages/board/model';
import type { miniImageSize } from '@shared/config';
import type { Box } from '@shared/model';
import { getLandscapeLayout } from '@pages/board/lib/image/background/getLandscapeLayout';

export type LandscapeImageProps = ImageProps & {
  layout: HeaderLayout
  view: Box
}

export const LandscapeImage = ({
  view,
  layout,
  ...props
}: LandscapeImageProps) => {
  const { picture } = useAppSelector(selectBoard);
  const { id } = picture;
  const uri = getInvestigatorImageUrl(id, 'mini');
  const source = { uri };

  const imageLayout = getLandscapeLayout({
    view,
    layout
  });
  
  return (
    <C.Background
      {...props}
      {...imageLayout}
      source={source}
    />
  );
}
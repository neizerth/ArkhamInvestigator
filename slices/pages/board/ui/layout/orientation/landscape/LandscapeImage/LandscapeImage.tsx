import { selectCurrentBoard, useAppSelector } from '@shared/lib';
import * as C from './LandscapeImage.components';
import { getInvestigatorImageUrl } from '@shared/api';
import type { ImageProps } from 'react-native';
import type { HeaderLayout } from '@pages/board/model';
import type { miniImageSize } from '@shared/config';
import type { Box } from '@shared/model';
import { getLandscapeLayout } from '@pages/board/lib/image/background/getLandscapeLayout';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board/config';

export type LandscapeImageProps = ImageProps;

export const LandscapeImage = ({
  ...props
}: LandscapeImageProps) => {
  const { view, layout } = useContext(LayoutContext);
  const { picture } = useAppSelector(selectCurrentBoard);
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
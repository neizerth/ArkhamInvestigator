import type { LayoutChangeEvent, ViewProps } from 'react-native';
import * as C from './InvestigatorImage.components';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import { useState } from 'react';
import type { Box } from '@shared/model/ui';
import { getBackgroundLayout } from '@pages/board/lib/image/geBackgroundLayout';

export type InvestigatorImageProps = ViewProps

export const InvestigatorImage = (props: InvestigatorImageProps) => {
  const board = useAppSelector(selectBoard);
  const [box, setBox] = useState<Box>();

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;

    setBox({
      width,
      height
    })
  }
  const { id, image } = board.picture
  const uri = getInvestigatorImageUrl(id, 'full');
  const source = { uri };

  const imageLayout = box && getBackgroundLayout({
    box,
    image
  });

  return (
    <C.Container 
      {...props}
      onLayout={onLayout}
    >
      {imageLayout && (
        <C.Background 
          source={source}
          box={imageLayout}
        />
      )}
    </C.Container>
  );
}
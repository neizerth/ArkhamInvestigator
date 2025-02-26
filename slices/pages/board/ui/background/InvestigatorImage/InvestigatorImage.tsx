import type { LayoutChangeEvent, ViewProps } from 'react-native';
import * as C from './InvestigatorImage.components';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import { useState } from 'react';
import type { Box } from '@shared/model/ui';
import { getBackgroundLayout } from '@pages/board/lib/image/background/getBackgroundLayout';
import type { PropsWithLayout } from '@pages/board/model';
import { Faction } from '@shared/model';
import { images } from './images';

export type InvestigatorImageProps = ViewProps & PropsWithLayout

export const InvestigatorImage = ({
  layout,
 ...props
}: InvestigatorImageProps) => {
  const board = useAppSelector(selectBoard);
  const [view, setView] = useState<Box>();

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;

    setView({
      width,
      height
    })
  }
  const { picture, investigator } = board;
  const faction = investigator.faction_code as Faction;

  const { id } = board.picture
  const uri = getInvestigatorImageUrl(id, 'full');
  const source = { uri };

  const imageLayout = view && getBackgroundLayout({
    layout,
    view,
    picture
  });

  const background = images[faction]

  return (
    <C.Container 
      {...props}
      onLayout={onLayout}
    >
      {imageLayout && (
        <C.Content>
          <C.FactionBackground
            source={background}
          />
          <C.BackgroundContainer layout={layout}>
            <C.Background 
              source={source}
              layout={imageLayout}
            />
          </C.BackgroundContainer>
        </C.Content>
      )}
    </C.Container>
  );
}
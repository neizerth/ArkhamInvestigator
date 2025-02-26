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

  return (
    <C.Container 
      {...props}
      onLayout={onLayout}
    >
      {imageLayout && (
        <C.Content>
          <C.FactionBackground
            faction={faction}
          />
          <C.Background 
            source={source}
            layout={imageLayout}
          />
        </C.Content>
      )}
    </C.Container>
  );
}
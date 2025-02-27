import type { LayoutChangeEvent, ViewProps } from 'react-native';
import * as C from './InvestigatorImage.components';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import { useState } from 'react';
import type { Box } from '@shared/model/ui';
import type { PropsWithLayout } from '@pages/board/model';
import type { Faction } from '@shared/model';
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
  const { investigator } = board;
  const faction = investigator.faction_code as Faction;

  const background = images[faction]

  return (
    <C.Container 
      {...props}
      onLayout={onLayout}
    >
      <C.Content>
        <C.FactionBackground
          source={background}
          width={view?.width}
          height={view?.height}
        />
        {view && layout.type === 'column' && (
          <C.PortraitBackground
            view={view}
            layout={layout}
          />
        )}
        {view && layout.type === 'row' && (
          <C.LandscapeBackground
            layout={layout}
            view={view}
          />
        )}
      </C.Content>
    </C.Container>
  );
}
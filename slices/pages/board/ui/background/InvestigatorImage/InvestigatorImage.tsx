import { useWindowDimensions, type LayoutChangeEvent, type ViewProps } from 'react-native';
import * as C from './InvestigatorImage.components';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import { useState } from 'react';
import type { Box } from '@shared/model/ui';
import type { PropsWithLayout } from '@pages/board/model';
import type { Faction } from '@shared/model';
import { images } from '../FactionBackground/images';

export type InvestigatorImageProps = ViewProps & PropsWithLayout & {
  view?: Box
}

export const InvestigatorImage = ({
  layout,
 ...props
}: InvestigatorImageProps) => {
  const window = useWindowDimensions();
  const view = props.view || window;

  return (
    <C.Container 
      {...props}
      view={view}
    >
      <C.Content>
        <C.FactionBackground 
          view={view}
          layout={layout}
        />
        {layout.type === 'column' && (
          <C.PortraitBackground
            view={view}
            layout={layout}
          />
        )}
        {layout.type === 'row' && (
          <C.LandscapeBackground
            layout={layout}
            view={view}
          />
        )}
      </C.Content>
    </C.Container>
  );
}
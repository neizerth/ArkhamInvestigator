import type { ViewProps } from 'react-native';
import * as C from './InvestigatorImage.components';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board';

export type InvestigatorImageProps = ViewProps;

export const InvestigatorImage = ({
 ...props
}: InvestigatorImageProps) => {
  const { view, layout } = useContext(LayoutContext);

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
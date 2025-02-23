import { useWindowDimensions, type ViewProps } from 'react-native';
import * as C from './BoardHeader.components';
import { getHeaderLayout } from '@pages/board/lib';
import type { PropsWithLayout } from '@pages/board/model';

export type BoardHeaderProps = ViewProps & PropsWithLayout

export const BoardHeader = (props: BoardHeaderProps) => {
  const window = useWindowDimensions();
  const layout = getHeaderLayout(window);

  const gap = layout.type === 'column' ? layout.gap : 0;
  const marginLeft = layout.type === 'row' ? -layout.gap : 0;

  const style = {
    flexDirection: layout.type,
    gap
  }

  const skillsStyle = {
    marginLeft
  }

  return (
    <C.Container 
      {...props}
      style={[props.style, style]}
    >
      <C.Title layout={layout}/>
      <C.Skills 
        layout={layout}
        style={skillsStyle}
      />
    </C.Container>
  );
}
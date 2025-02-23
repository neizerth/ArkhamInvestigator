import { useWindowDimensions, type ViewProps } from 'react-native';
import * as C from './BoardHeader.components';
import { getHeaderLayout } from '@pages/board/lib';

export type BoardHeaderProps = ViewProps

export const BoardHeader = (props: BoardHeaderProps) => {
  const window = useWindowDimensions();
  const layout = getHeaderLayout(window);

  const style = {
    flexDirection: layout.type,
    gap: layout.type === 'column' ? layout.gap : 0
  }

  const skillsStyle = {
    marginLeft: layout.type === 'row' ? -layout.gap : 0
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
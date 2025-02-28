import type { ViewProps } from 'react-native';
import * as C from './BoardHeader.components';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board/config';

export type BoardHeaderProps = ViewProps;

export const BoardHeader = (props: BoardHeaderProps) => {
  const { layout } = useContext(LayoutContext);

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
      <C.Title/>
      <C.Skills style={skillsStyle}/>
    </C.Container>
  );
}
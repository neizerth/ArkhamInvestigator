import { Children } from 'react';
import * as C from './List.components';
import type { TextStyle, ViewProps, ViewStyle } from 'react-native';
import { v4 } from 'uuid';

export type ListProps = ViewProps & {
  renderMarker?: (index: number) => React.ReactElement
  itemContainerStyle?: ViewStyle
}

const defaultRenderMarker = () => (
  <C.Marker>•</C.Marker>
)


export const List = ({
  children,
  itemContainerStyle,
  bold,
  renderMarker = defaultRenderMarker,
  ...props
}: ListProps) => {
  return (
    <C.Container {...props}>
      {Children.map(children, (child, index) => (
        <C.ItemContainer 
          key={v4()}
          style={itemContainerStyle}
        >
          {renderMarker(index)}
          {child}
        </C.ItemContainer>
      ))}
    </C.Container>
  );
};

List.Item = C.Item;
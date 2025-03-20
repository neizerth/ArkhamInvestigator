import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  overflow: hidden;
`;

export const List: typeof Animated.FlatList = styled(Animated.FlatList)`
  
`;

export const Content: typeof View = styled(View)`
  position: relative;
`;

export const ItemContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;

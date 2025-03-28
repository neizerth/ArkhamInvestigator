import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const List: typeof Animated.FlatList = styled(Animated.FlatList)`
  
`;

export const Container: typeof Pressable = styled(Pressable)`
  
`;

export const Content: typeof View = styled(View)`
  position: relative;
`;

export const ItemContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;

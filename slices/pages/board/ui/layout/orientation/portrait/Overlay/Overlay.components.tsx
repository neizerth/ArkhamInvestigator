import { Pressable } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof Animated.View = styled(Animated.View)`
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Area: typeof Pressable = styled(Pressable)`
`;

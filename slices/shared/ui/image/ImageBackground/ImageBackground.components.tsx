import { Image } from "expo-image";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof Animated.View = styled(Animated.View)`
  position: relative;
`;

export const Background: typeof Image = styled(Image)`
  position: absolute;
  left: 0;
  top: 0;
`;

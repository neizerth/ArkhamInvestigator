import { Pressable } from "@modules/core/haptic/shared/ui";
import { color } from "@shared/config";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof Animated.View = styled(Animated.View)`
  background-color: ${color.modal.background.dark};
`;

export const Area: typeof Pressable = styled(Pressable)`
  flex: 1;
`;

import { Pressable } from "@modules/core/touch/shared/ui";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof Animated.View = styled(Animated.View)`
  background-color: ${({ theme }) => theme.color.modal.background.dark};
`;

export const Area: typeof Pressable = styled(Pressable)`
  flex: 1;
`;

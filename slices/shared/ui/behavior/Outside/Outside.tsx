import { Pressable } from "react-native";
import styled from "styled-components/native";

export const Outside: typeof Pressable = styled(Pressable)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

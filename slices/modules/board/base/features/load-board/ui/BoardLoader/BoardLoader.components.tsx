import { LoadScreenMemo as LoadScreen, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Loader: typeof LoadScreen = styled(LoadScreen)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: black;
`;

export const Content: typeof View = styled(View)`
  position: relative;
  width: 100%;
`;

export const LoadingText: typeof Text = styled(Text)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: ${({ theme }) => theme.size.gap.default}px;
`;

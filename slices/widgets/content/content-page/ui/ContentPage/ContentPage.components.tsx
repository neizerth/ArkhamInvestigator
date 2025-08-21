import { navBarHeight, size } from "@shared/config";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const FullContent: typeof View = styled(View)`
  flex: 1;
  padding-bottom: ${navBarHeight}px;
`;

export const Content: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: ${size.gap.medium}px ${size.gap.medium}px ${navBarHeight}px;
  padding-top: 0;
  margin-bottom: ${size.gap.default}px;
`;

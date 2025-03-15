import { size } from "@shared/config";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { View } from "react-native";

export const FullContent: typeof View = styled(View)`
  flex: 1;
`

export const Content: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: ${size.gap.medium}px;
  padding-top: 0;
`
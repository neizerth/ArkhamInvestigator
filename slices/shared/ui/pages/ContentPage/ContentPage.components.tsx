import { size } from "@shared/config";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Content: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: ${size.gap.medium}px;
`
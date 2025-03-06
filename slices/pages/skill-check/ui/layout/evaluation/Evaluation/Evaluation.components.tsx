import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.default}px;
  padding-bottom: ${size.gap.large}px;
  justify-content: flex-end;
  gap: ${size.gap.default}px;
`

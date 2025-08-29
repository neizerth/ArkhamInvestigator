import { View } from "react-native";
import styled from "styled-components/native";
import { size } from "../../../config";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${size.gap.default}px;
`;

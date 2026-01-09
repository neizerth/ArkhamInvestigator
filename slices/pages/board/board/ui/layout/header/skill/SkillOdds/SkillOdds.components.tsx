import { color } from "@shared/config";
import { Value } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const Content: typeof Value = styled(Value)`
  color: ${color.text};
  font-size: 32px;
`;

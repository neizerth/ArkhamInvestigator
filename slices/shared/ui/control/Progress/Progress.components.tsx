import { View } from "react-native";
import styled from "styled-components/native";
import { color } from "../../../config";
export const Container: typeof View = styled(View)`
  width: 200px;
  height: 1px;
  background-color: ${color.dark30};
`;

export const Value: typeof View = styled(View)`
  flex: 1;
  background-color: ${color.dark10};
`;

import { View } from "react-native";
import styled from "styled-components/native";
import { color, navBarHeight } from "../../../config";

export const Container: typeof View = styled(View)`
  background-color: ${color.dark40};
  padding-bottom: ${navBarHeight}px;
  flex: 1;
`;

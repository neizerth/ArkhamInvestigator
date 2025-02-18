import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`
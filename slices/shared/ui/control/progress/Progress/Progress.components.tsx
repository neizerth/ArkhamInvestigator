import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  width: 200px;
  height: 1px;
  background-color: ${({ theme }) => theme.color.dark30};
`;

export const Value: typeof View = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.color.dark10};
`;

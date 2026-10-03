import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${({ theme }) => theme.color.dark40};
  padding-bottom: ${({ theme }) => theme.navbarHeight}px;
  flex: 1;
`;

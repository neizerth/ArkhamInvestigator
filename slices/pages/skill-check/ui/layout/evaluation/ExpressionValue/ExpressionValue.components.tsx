import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { UnscaledText } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`

`;

export const Value: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${({ theme }) => theme.fontFamily.Copasetic.regular};
  font-size: 30px;
  color: ${({ theme }) => theme.color.dark10};
  text-align: right;

  letter-spacing: 2px;
`;

import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { Row } from "../../../grid";
import { Text } from "../../typography";

export const Container: typeof View = styled(View)`

`;

export const Header: typeof Row = styled(Row)`
  justify-content: space-between;

  border: 1px solid transparent;
  border-left-width: 0px;
  ${({ theme: { color, size } }) => css`
    border-bottom-color: ${color.dark10};
    margin-bottom: ${size.gap.default}px;
  `}
`;

export const Title: typeof Text = styled(Text)`
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.medium};
  font-size: ${({ theme }) => theme.font.size.default}px;

`;

export const Value: typeof Text = styled(Text)`
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.italic};
  font-size: ${({ theme }) => theme.font.size.default}px;
`;

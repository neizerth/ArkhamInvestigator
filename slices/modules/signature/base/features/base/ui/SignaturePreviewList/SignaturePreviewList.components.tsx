import { Row, TentacleUnderline, Text } from "@shared/ui";
import { SectionList } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof SectionList = styled(SectionList)`
`;

export const ItemRow: typeof Row = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Title: typeof Text = styled(Text)`
  ${({ theme: { font, size } }) => css`
  text-align: center;
  font-size: ${font.size.medium}px;
  margin-bottom: ${size.gap.default}px;
`}`;

export const Underline: typeof TentacleUnderline = styled(TentacleUnderline)`
  margin-top: -10px;
`;

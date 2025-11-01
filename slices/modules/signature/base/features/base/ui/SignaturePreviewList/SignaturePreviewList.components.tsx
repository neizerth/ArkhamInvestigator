import { font, size } from "@shared/config";
import { Row, TentacleUnderline, Text } from "@shared/ui";
import { SectionList } from "react-native";
import styled from "styled-components/native";

export const Container: typeof SectionList = styled(SectionList)`
`;

export const ItemRow: typeof Row = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;
  gap: ${size.gap.default}px;
`;

export const Title: typeof Text = styled(Text)`
  text-align: center;
  font-size: ${font.size.medium}px;
  margin-bottom: ${size.gap.default}px;
`;

export const Underline: typeof TentacleUnderline = styled(TentacleUnderline)`
  margin-top: -10px;
`;

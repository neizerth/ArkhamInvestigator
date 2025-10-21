import { font, size } from "@shared/config";
import { Row, Text } from "@shared/ui";
import { SectionList } from "react-native";
import styled from "styled-components/native";
import { SignatureListItem } from "../SignatureListItem";

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

export const Item: typeof SignatureListItem = styled(SignatureListItem)`
  flex: 1;
`;

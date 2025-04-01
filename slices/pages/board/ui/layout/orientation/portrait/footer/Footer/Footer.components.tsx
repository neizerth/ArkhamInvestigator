import { PORTRAIT_DESCRIPTION_HEIGHT } from "@pages/board/config";
import { size } from "@shared/config";
import { Row as BaseRow } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { FooterDescription } from "../FooterDescription";

export const Container: typeof View = styled(View)`
  padding-top: 40px;
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  justify-content: space-between;
  align-items: center;
`;

export const Investigator: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
`;

export const Stats: typeof Row = styled(Row)`
  padding: 0 0 0 ${size.gap.default}px;
`;

export const MainStats: typeof Row = styled(Row)`
  position: relative;
  gap: ${size.gap.medium}px;
`;

export const Description: typeof FooterDescription = styled(FooterDescription)`
  z-index: 5;
  height: ${PORTRAIT_DESCRIPTION_HEIGHT}px;
`;

import { size } from "@shared/config";
import { Row as BaseRow } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT } from "../../../../../../config";

export const Container: typeof View = styled(View)`
  padding-top: 0px;
  padding-bottom: ${DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT + 5}px;
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
  gap: ${size.gap.medium}px;
`;

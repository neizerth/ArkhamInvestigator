import { size } from "@shared/config";
import { Row } from "@shared/ui";
import { SectionList } from "react-native";
import styled from "styled-components/native";
import { InvestigatorListItem } from "../InvestigatorListItem";
import { InvestigatorListSeparator } from "../InvestigatorListSeparator";

export const Container: typeof SectionList = styled(SectionList).attrs({
	contentContainerStyle: {
		gap: size.gap.default,
		paddingBottom: 65,
	},
})`
`;

export const ItemRow: typeof Row = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;
  gap: ${size.gap.default}px;
`;

export const Item: typeof InvestigatorListItem = styled(InvestigatorListItem)`
  
`;

export const Separator: typeof InvestigatorListSeparator = styled(
	InvestigatorListSeparator,
)`
  margin-top: -10px;
`;

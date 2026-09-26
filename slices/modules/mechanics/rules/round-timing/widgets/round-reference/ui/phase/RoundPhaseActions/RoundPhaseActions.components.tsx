import { IconButton } from "@shared/ui";
import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { StepDoom, StepResources } from "../../step";

export const Container: typeof Row = styled(Row)`
  align-items: center;
`;

export const Doom: typeof StepDoom = styled(StepDoom)`

`;

export const Resources: typeof StepResources = styled(StepResources)`

`;

export const UpkeepControl: typeof IconButton = styled(IconButton).attrs(
	({ theme }) => ({
		iconStyle: {
			fontSize: 20,
			lineHeight: 20,
			color: theme.color.title,
		},
	}),
)`
  padding: ${({ theme }) => theme.size.gap.small}px;
`;

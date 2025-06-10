import { IconButton } from "@modules/haptic/widgets";
import { color, size } from "@shared/config";
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

export const UpkeepControl: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 20,
		lineHeight: 20,
		color: color.title,
	},
})`
  padding: ${size.gap.small}px;
`;

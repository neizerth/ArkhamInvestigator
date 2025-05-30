import { size } from "@shared/config";
import { Row } from "@shared/ui";
import type { FC } from "react";
import styled from "styled-components";
import { GameText, type GameTextProps } from "../../../../../game-text";
import { StepDoom } from "../StepDoom";
import { StepResources } from "../StepResources";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
  padding: 7px 12px;
  gap: ${size.gap.default}px;
  align-items: center;
`;

type TextProps = GameTextProps & {
	end?: boolean;
};

export const Text: FC<TextProps> = styled(GameText).attrs(
	({ end }: TextProps) => ({
		contentContainerStyle: {
			flex: 1,
			alignItems: end ? "center" : "flex-start",
		},
	}),
)`

`;

export const End: typeof Row = styled(Row)`
	justify-content: center;
`;

export const Doom: typeof StepDoom = styled(StepDoom)`
  z-index: 2;
`;

export const Resources: typeof StepResources = styled(StepResources)`
  z-index: 2;
`;

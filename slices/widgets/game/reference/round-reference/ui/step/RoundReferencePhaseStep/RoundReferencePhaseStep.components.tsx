import { GameText, type GameTextProps } from "@entities/game-text";
import { size } from "@shared/config";
import { Row } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { css } from "styled-components/native";
import { phaseContentFontSize } from "../../../config";
import { StepActions } from "../StepActions";
import { StepDoom } from "../StepDoom";
import { StepResources } from "../StepResources";

export const Container: typeof View = styled(View)`
	flex-direction: row;
  justify-content: space-between;
  padding: 7px 12px;
  gap: ${size.gap.default}px;
  align-items: center;
	z-index: 2;
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
	font-size: ${phaseContentFontSize}px;
`;

export const End: typeof Row = styled(Row)`
	justify-content: center;
`;

const controlStyle = css`
	z-index: 2;
`;

export const Doom: typeof StepDoom = styled(StepDoom)`
  ${controlStyle};
`;

export const Resources: typeof StepResources = styled(StepResources)`
  ${controlStyle};
`;

export const Actions: typeof StepActions = styled(StepActions)`
  ${controlStyle};
`;

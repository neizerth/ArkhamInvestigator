import { color, font } from "@shared/config";
import { ArnoPro } from "@shared/fonts";
import { GameText } from "@widgets/game-text";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import type { InvestigatorTextProps } from "./InvestigatorText.types";

export const Text: FC<InvestigatorTextProps> = styled(GameText)`
  font-family: ${ArnoPro.regular};
  color: ${color.text};
`;

import { GameText } from "@entities/game-text";
import { FactionModal } from "@modules/core/modal/shared/base/ui";
import { color, font } from "@shared/config";
import { InvestigatorSelectSection } from "@widgets/investigator/investigator-select-section";
import styled from "styled-components/native";

export const Container = styled(FactionModal)`
  
`;

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;

export const Select: typeof InvestigatorSelectSection = styled(
	InvestigatorSelectSection,
)`
  
`;

import { FactionModal } from "@modules/core/modal/shared/base/ui";
import { GameText } from "@modules/core/theme/shared/ui";
import { SignatureDetailSelect } from "@modules/signature/base/features/base/ui";
import { color, font } from "@shared/config";
import styled from "styled-components/native";

export const Container = styled(FactionModal)`
  
`;

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;

export const Select: typeof SignatureDetailSelect = styled(
	SignatureDetailSelect,
)`
  
`;

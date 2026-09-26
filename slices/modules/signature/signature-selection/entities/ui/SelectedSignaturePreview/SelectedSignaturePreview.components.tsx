import { ThemeFactionFontIcon } from "@modules/core/theme/shared/ui";
import { Row } from "@shared/ui";
import { Image } from "expo-image";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Faction: typeof ThemeFactionFontIcon = styled(
	ThemeFactionFontIcon,
)`
  font-size: ${({ theme }) => theme.font.size.default}px;
  width: 24px;
  text-align: center;
`;

export const InvestigatorImage: typeof Image = styled(Image)`
  width: 30px;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.size.borderRadius.default}px;
`;

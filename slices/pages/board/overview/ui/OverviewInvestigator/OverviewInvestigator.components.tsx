import {
	ActionsValue,
	CluesValue,
	HealthValue,
	ResourcesValue,
	SanityValue,
} from "@modules/board/base/entities/base/ui";
import { ThemeSignaturePreview } from "@modules/core/theme/features/ui";
import { FactionView } from "@modules/faction/entities/ui";
import { SignatureSkills } from "@modules/signature/base/shared/ui";
import { Row, TextView } from "@shared/ui";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  padding: ${({ theme }) => theme.size.gap.default}px 0;
`;

export const Content: typeof Row = styled(Row)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Image: typeof ThemeSignaturePreview = styled(
	ThemeSignaturePreview,
)`
  border-radius: ${({ theme }) => theme.size.borderRadius.default}px;
`;

export const Primary: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Secondary: typeof Row = styled(Row)`
  flex: 1;
  justify-content: flex-end;
`;

export const Name: typeof TextView = styled(TextView)`
  font-size: ${({ theme }) => theme.font.size.default}px;
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.bold};
`;

export const Skills: typeof SignatureSkills = styled(SignatureSkills)`
  
`;

export const Health: typeof HealthValue = styled(HealthValue)`
  
`;

export const Sanity: typeof SanityValue = styled(SanityValue)`
  
`;

export const Clues: typeof CluesValue = styled(CluesValue)`
  
`;

export const Resources: typeof ResourcesValue = styled(ResourcesValue)`
  
`;

export const Actions: typeof ActionsValue = styled(ActionsValue)`
  
`;

export const Stats: typeof Row = styled(Row)`
  gap: ${({ theme }) => theme.size.gap.small}px;
  justify-content: center;
`;

export const FactionPlaceholder: typeof TouchableOpacity = styled(
	TouchableOpacity,
)`
  width: 110px;
`;

export const Faction: typeof FactionView = styled(FactionView).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  font-size: 50px;
`;

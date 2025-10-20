import { ChaosBagRevealedToken } from "@modules/chaos-bag/reveal/base/entities/ui/ChaosBagRevealedToken";
import {
	SignaturePreview,
	type SignaturePreviewProps,
} from "@modules/signature/base/entities/ui";
import { color, factionColor, font, size } from "@shared/config";
import { Row, Text } from "@shared/ui";
import { SkillCheckExpressionDisplay } from "@widgets/game/skill-check";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { ChaosBagRevalItemSkillCheck } from "../ChaosBagRevalItemSkillCheck";

export const Container: typeof Row = styled(Row)`
  padding: ${size.gap.small}px ${size.gap.default}px;
  align-items: center;
  gap: ${size.gap.small}px;
`;

export const SkillCheck: typeof ChaosBagRevalItemSkillCheck = styled(
	ChaosBagRevalItemSkillCheck,
)`
  margin-right: ${size.gap.large}px;
`;

export const Image: typeof SignaturePreview = styled(SignaturePreview)`
  border-radius: 24px;
  border: 1px solid;
  ${({ faction }: SignaturePreviewProps) => css`
    border-color: ${factionColor[faction].border};
  `}
`;

export const TokenList: typeof FlatList = styled(FlatList).attrs({
	contentContainerStyle: {
		paddingRight: size.gap.default,
	},
})`
  border-radius: 32px;
	padding: ${size.gap.small}px ${size.gap.default}px;
`;

export const List: typeof View = styled(View)`
  position: relative;
  flex: 1;
`;

export const Title: typeof View = styled(View)`
  position: absolute;
  left: 0;
  bottom: 2px;
`;

export const TitleText: typeof Text = styled(Text)`
  font-size: ${font.size.small}px;

  padding: 0 ${size.gap.small}px;
  background-color: ${color.dark20};
  border-radius: ${size.borderRadius.default}px;
`;

export const Token: typeof ChaosBagRevealedToken = styled(
	ChaosBagRevealedToken,
)`
  
`;

export const Separator: typeof View = styled(View)`
  width: 1px;
  height: 15px;
  background-color: ${color.dark10};
`;

export const Position: typeof Text = styled(Text)`
  font-size: ${font.size.large}px;
  text-align: center;
  width: 36px;
`;

export const Expression: typeof SkillCheckExpressionDisplay = styled(
	SkillCheckExpressionDisplay,
)`
  color: ${color.light10};
  background-color: ${color.dark20};
  padding: 2px 5px;
  border-radius: 2px;
`;

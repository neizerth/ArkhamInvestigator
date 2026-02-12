import { Alegreya } from "@assets/fonts";
import { ThemeFactionFontIcon } from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { SelectedSignaturePreview } from "@modules/signature/signature-selection/entities/ui";
import { color, font, size } from "@shared/config";
import { Icon as BaseIcon, Row, UnscaledText } from "@shared/ui";
import { Image } from "expo-image";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${size.gap.default}px ${size.gap.medium}px;
  border-radius: 25px;
  background-color: ${color.light10};
`;

export const Content: typeof Row = styled(Row)`
  justify-content: space-between;
  align-items: center;
  gap: ${size.gap.default}px;
`;

export const InvestigatorImage: typeof Image = styled(Image)`
  width: 30px;
  aspect-ratio: 1;
  border-radius: ${size.borderRadius.default}px;
`;

export const Investigators: typeof SelectedSignaturePreview = styled(
	SelectedSignaturePreview,
)`

`;

export const TextContainer: typeof View = styled(View)`
  padding-bottom: 3px;
`;

export const Text: typeof UnscaledText = styled(UnscaledText)`
  font-size: ${font.size.default}px;
  color: ${color.black};
  text-align: right;
  font-family: ${Alegreya.regular};
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: ${font.size.default}px
`;

export const Waiting: typeof ActivityIndicator = styled(
	ActivityIndicator,
).attrs({
	color: color.black,
})`
`;

export const Faction: typeof ThemeFactionFontIcon = styled(
	ThemeFactionFontIcon,
)`
    font-size: ${font.size.default}px;
    width: 24px;
    text-align: center;
  `;

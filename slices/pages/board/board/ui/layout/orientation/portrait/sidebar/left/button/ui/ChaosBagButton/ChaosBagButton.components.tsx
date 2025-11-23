import { chaosBagImage } from "@assets/images/game/chaos-bag";
import { ChaosTokenPreview } from "@modules/chaos-bag/base/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { ImageBackground, Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { ChaosBagButtonLastRevealIcon } from "../ChaosBagButtonLastRevealIcon";
import { ChaosBagDifficulty } from "../ChaosBagDifficulty";
import { ChaosBagOddsValue } from "../ChaosBagOddsValue";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Content: typeof Row = styled(Row)`
`;

export const Difficulty: typeof ChaosBagDifficulty = styled(ChaosBagDifficulty)`

`;

export const OddsValue: typeof ChaosBagOddsValue = styled(
	ChaosBagOddsValue,
).attrs({
	contentContainerStyle: {
		bottom: 12,
	},
})`
`;

export const LastReveal: typeof ChaosBagButtonLastRevealIcon = styled(
	ChaosBagButtonLastRevealIcon,
)`
  position: absolute;
  right: -15px;
  top: -10px;
`;

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  padding-left: 7px;
`;

export const Background: typeof ImageBackground = styled(ImageBackground).attrs(
	{
		contentFit: "contain",
		source: chaosBagImage,
	},
)`
  width: 50px;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
`;

export const SealedTokenGroups: typeof Row = styled(Row)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: -28px;
  justify-content: space-between;
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview).attrs({
	tokenPadding: 1,
	sealOffset: 2,
})`

`;

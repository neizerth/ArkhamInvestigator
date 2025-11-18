import { chaosBagImage } from "@assets/images/game/chaos-bag";
import { ChaosTokenPreview } from "@modules/chaos-bag/base/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Row } from "@shared/ui";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { ChaosBagButtonLastRevealIcon } from "../ChaosBagButtonLastRevealIcon";

export const Container: typeof View = styled(View)`
  position: relative;
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
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
`;

export const Background: typeof Image = styled(Image).attrs({
	resizeMode: "contain",
	source: chaosBagImage,
})`
  width: 50px;
  height: 60px;
`;

export const SealedTokenGroups: typeof Row = styled(Row)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: -33px;
  justify-content: space-between;
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview).attrs({
	tokenPadding: 1,
	sealOffset: 2,
})`

`;

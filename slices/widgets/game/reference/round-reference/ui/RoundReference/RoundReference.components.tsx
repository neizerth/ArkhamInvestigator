import { roundReferenceAssets } from "@assets/images/game/reference/round";
import { ReferenceTitle } from "@features/game";
import { color, font, size } from "@shared/config";
import { ImageBackground } from "@shared/ui";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { currentRoundReferenceSize } from "../../config";
import { RoundPhaseHeader } from "../RoundPhaseHeader";
import { RoundReferencePhase } from "../RoundReferencePhase";

export const Container: typeof ImageBackground = styled(ImageBackground).attrs({
	source: roundReferenceAssets.background,
})`
  width: ${currentRoundReferenceSize.width}px;
  height: ${currentRoundReferenceSize.height}px;
  padding: 6% 5% 8%;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  gap: ${size.gap.default}px;
`;

export const Title: typeof View = styled(View)`
  align-items: center;
`;

export const Body: typeof View = styled(View)`
  position: relative;
  flex: 1;
`;

export const ActivePhase: typeof RoundPhaseHeader = styled(RoundPhaseHeader)`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: -7px;
`;

export const TitleContent: typeof ReferenceTitle = styled(ReferenceTitle)`
	font-size: ${font.size.medium}px;
  color: ${color.title};
`;

export const Phases: typeof FlatList = styled(FlatList)`
  flex: 1;
`;

export const Phase: typeof RoundReferencePhase = styled(RoundReferencePhase)`

`;

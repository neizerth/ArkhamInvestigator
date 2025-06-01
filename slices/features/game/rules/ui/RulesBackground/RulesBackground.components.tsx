import { roundReferenceAssets } from "@assets/images/game/reference/round";
import { ImageBackground } from "@shared/ui";
import styled from "styled-components/native";
import { currentRoundReferenceSize } from "../../config";

export const Container: typeof ImageBackground = styled(ImageBackground).attrs({
	source: roundReferenceAssets.background,
})`
  width: ${currentRoundReferenceSize.width}px;
  height: ${currentRoundReferenceSize.height}px;
  padding: 6% 5% 8%;
`;

import { ThemeFactionBackground } from "@modules/core/theme/shared/ui";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screen = Dimensions.get("screen");

export const Background: typeof ThemeFactionBackground = styled(
	ThemeFactionBackground,
)`
  width: ${screen.width}px;
  height: ${screen.height}px;
`;

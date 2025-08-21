import { FactionBackground } from "@modules/faction/shared/ui";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screen = Dimensions.get("screen");

export const Background: typeof FactionBackground = styled(FactionBackground)`
  width: ${screen.width}px;
  height: ${screen.height}px;
`;

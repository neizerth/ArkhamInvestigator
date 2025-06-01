import { TouchableOpacity } from "@features/haptic";
import { gameAssets } from "@shared/config";
import { Action } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  transform: translateY(-2px);
`;

const height = 24;

export const Icon: typeof Action = styled(Action)`
  height: ${height}px;
  width: ${gameAssets.action.ratio * height}px;
`;

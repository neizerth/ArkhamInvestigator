import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { FactionSelectButton } from "../FactionSelectButton";

export const Container: typeof View = styled(View)`
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  justify-content: center;
  align-items: center;
  padding: ${size.gap.large}px;
`;

export const Content: typeof View = styled(View)`
  padding: 0px ${size.gap.large}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${size.gap.large}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${size.gap.default}px;
  max-height: 85px;
`;

export const Button: typeof FactionSelectButton = styled(FactionSelectButton)`
  flex: 1;
`;

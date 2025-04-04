import { size } from "@shared/config";
import { Row } from "@shared/ui";
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
  background-color: rgba(0, 0, 0, 0.3);

  justify-content: center;
  align-items: center;
  padding: ${size.gap.large}px;
`;

export const Content: typeof Row = styled(Row)`
  padding: 0px ${size.gap.medium}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${size.borderRadius.large}px;
  align-items: center;
  gap: ${size.gap.medium}px;
  max-height: 85px;
`;

export const Button: typeof FactionSelectButton = styled(FactionSelectButton)`
  /* flex: 1; */
`;

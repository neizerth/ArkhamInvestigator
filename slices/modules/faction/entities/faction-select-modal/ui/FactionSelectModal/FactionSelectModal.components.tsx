import { ModalContainer } from "@modules/core/modal/shared/base/ui";
import { size } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { FactionSelectButton } from "../FactionSelectButton";

export const Container: typeof View = styled(View)`
  background-color: rgba(0, 0, 0, 0.3);

  justify-content: center;
  align-items: center;
  padding: ${size.gap.large}px;
`;

export const Content: typeof Row = styled(Row)`
  flex: 1;
  padding: 0px ${size.gap.medium}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${size.borderRadius.large}px;
  align-items: center;
  gap: ${size.gap.medium}px;
  max-height: 85px;
`;

export const Modal: typeof ModalContainer = styled(ModalContainer)`

`;

export const Button: typeof FactionSelectButton = styled(FactionSelectButton)`
  flex: 1;
`;

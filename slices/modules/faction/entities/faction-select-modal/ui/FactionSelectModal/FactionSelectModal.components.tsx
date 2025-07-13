import { CustomModal } from "@modules/core/modal/shared/base/ui";
import { size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { FactionSelectButton } from "../FactionSelectButton";

export const Content: typeof Row = styled(Row)`
  flex: 1;
  width: 100%;
  justify-content: center;
  padding: 0px ${size.gap.medium}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${size.borderRadius.large}px;
  align-items: center;
  gap: ${size.gap.medium}px;
  max-height: 85px;
`;

export const Modal: typeof CustomModal = styled(CustomModal)`
  padding: ${size.gap.large}px;
`;

export const Button: typeof FactionSelectButton = styled(FactionSelectButton)`
  flex: 1;
`;

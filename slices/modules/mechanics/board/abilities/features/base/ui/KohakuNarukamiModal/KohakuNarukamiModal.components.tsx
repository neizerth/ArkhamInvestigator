import { CustomModal, FactionModal } from "@modules/core/modal/shared/base/ui";
import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";

export const Modal: typeof CustomModal = styled(CustomModal)`
`;

export const Confirm: typeof FactionModal = styled(FactionModal)`
  
`;

export const Content: typeof View = styled(View)`
  height: 90px;
  padding-top: ${size.gap.large}px;
  gap: ${size.gap.medium}px;
`;

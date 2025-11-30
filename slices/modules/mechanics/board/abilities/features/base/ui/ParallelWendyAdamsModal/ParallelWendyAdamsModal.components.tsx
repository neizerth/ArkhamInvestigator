import { ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { CustomModal, FactionModal } from "@modules/core/modal/shared/base/ui";
import { GameText } from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { font, size } from "@shared/config";
import { color } from "@shared/config";
import { Row, TextView } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Modal: typeof CustomModal = styled(CustomModal)`
`;

export const Confirm: typeof FactionModal = styled(FactionModal)`
  
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.medium}px;
  padding-bottom: ${size.gap.default}px;
`;

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;

export const Hint: typeof GameText = styled(GameText)`
  color: ${color.light10};
`;

export const SelectedContent: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;
export const Rule: typeof View = styled(View)`
  width: 50%;
  margin: 0 auto;
  height: 1px;
  background-color: ${color.dark10};
`;

export const SelectedTitle: typeof TextView = styled(TextView)`
  text-align: center;
`;

export const List: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
  justify-content: center;
  align-items: center;
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
`;

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
`;

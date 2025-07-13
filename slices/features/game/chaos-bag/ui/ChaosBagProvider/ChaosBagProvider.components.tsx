import { ChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/features/chaos-token-reveal-modal/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Modal: typeof ChaosTokenRevealModal = styled(
	ChaosTokenRevealModal,
)`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

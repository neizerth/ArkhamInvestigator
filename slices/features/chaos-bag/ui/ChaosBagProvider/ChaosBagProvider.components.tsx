import { View } from "react-native";
import styled from "styled-components/native";
import { ChaosTokenRevealModal } from "../reveal";

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

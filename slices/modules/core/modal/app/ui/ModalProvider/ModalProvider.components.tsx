import styled from "styled-components/native";
import { ActiveModal } from "../ActiveModal";

export const Modal: typeof ActiveModal = styled(ActiveModal)`
  z-index: 1000;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex: 1;
`;

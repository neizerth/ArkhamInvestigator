import styled from "styled-components/native";
import { FactionModal as BaseModal } from "../faction/FactionModal/FactionModal";

export const Modal: typeof BaseModal = styled(BaseModal)`
  z-index: 1000;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex: 1;
`;

export const Container: typeof BaseModal = styled(BaseModal)`
  z-index: 1000;
  flex: 1;
`;

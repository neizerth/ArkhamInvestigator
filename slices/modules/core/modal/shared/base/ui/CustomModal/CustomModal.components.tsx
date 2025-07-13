import styled from "styled-components/native";
import { Modal as BaseModal } from "../Modal";

export const Modal: typeof BaseModal = styled(BaseModal)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex: 1;
`;

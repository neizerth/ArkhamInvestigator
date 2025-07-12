import { FactionModal } from "@modules/core/modal/shared/base/ui";
import styled from "styled-components/native";

export const Modal: typeof FactionModal = styled(FactionModal)`
  z-index: 1000;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex: 1;
`;

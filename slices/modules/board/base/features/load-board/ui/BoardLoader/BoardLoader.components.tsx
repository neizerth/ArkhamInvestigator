import { LoadScreen } from "@shared/ui";
import styled from "styled-components/native";

export const Loader: typeof LoadScreen = styled(LoadScreen)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: black;
`;

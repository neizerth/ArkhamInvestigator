import { color } from "@shared/config";
import { IconNumber } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof IconNumber = styled(IconNumber)
  .attrs({
    stroke: true,
  })`
    color: white;
    font-size: 60px;
  `
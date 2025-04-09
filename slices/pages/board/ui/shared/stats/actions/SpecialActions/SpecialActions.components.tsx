import { size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { Ability as BaseAbility } from "../Ability";
import { AdditionalAction } from "../AdditionalAction";

export const Container: typeof Row = styled(Row)`
  background-color: rgba(0, 0, 0, 0.4);
  padding-left: 40px;
  border-radius: ${size.borderRadius.large}px;
  align-items: center;
`;

export const Additional: typeof AdditionalAction = styled(AdditionalAction)`
  
`;

export const Ability: typeof BaseAbility = styled(BaseAbility)`
  
`;

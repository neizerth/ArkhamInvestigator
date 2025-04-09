import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { Ability as BaseAbility } from "../Ability";
import { AdditionalAction } from "../AdditionalAction";

export const Container: typeof Row = styled(Row)`
  align-items: center;
`;

export const Additional: typeof AdditionalAction = styled(AdditionalAction)`
  
`;

export const Ability: typeof BaseAbility = styled(BaseAbility)`
  
`;

import { TouchableOpacity } from "@modules/core/haptic/shared/ui";
import { Resource } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding-bottom: 5px;
`;

export const Icon: typeof Resource = styled(Resource)`
  width: 34px;
  height: 34px;
`;

import { ResourceStatBackground } from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding-bottom: 5px;
`;

export const Icon: typeof ResourceStatBackground = styled(
	ResourceStatBackground,
)`
  width: 34px;
  height: 34px;
`;

import { ChaosTokenRevealLoader } from "@modules/chaos-bag/reveal/base/entities/ui";
import { TouchableOpacity } from "@modules/core/haptic/shared/ui";
import styled from "styled-components/native";

export const Loader: typeof ChaosTokenRevealLoader = styled(
	ChaosTokenRevealLoader,
).attrs({
	size: 150,
})`
  flex: 1;
`;

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`

`;

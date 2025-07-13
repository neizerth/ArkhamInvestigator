import { ChaosTokenRevealLoader } from "@modules/chaos-bag/reveal/base/entities/ui";
import { View } from "react-native";
import styled from "styled-components";

export const Loader: typeof ChaosTokenRevealLoader = styled(
	ChaosTokenRevealLoader,
).attrs({
	size: 150,
})`
`;

export const Container: typeof View = styled(View)`
`;

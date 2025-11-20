import { View } from "react-native";
import styled from "styled-components";
import { refPx as upx } from "../../lib";
import { ScenarioReferenceTokenEffect } from "../ScenarioReferenceTokenEffect/ScenarioReferenceTokenEffect";

export const Container: typeof View = styled(View)`
  gap: ${upx(5)};
`;

export const Item: typeof ScenarioReferenceTokenEffect = styled(
	ScenarioReferenceTokenEffect,
)`
`;

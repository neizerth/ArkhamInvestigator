import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { color } from "../../../config";

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
  flex: 1;
`;

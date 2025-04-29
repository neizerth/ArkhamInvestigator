import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { color, size } from "../../../config";

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
	padding: ${size.gap.default}px 0;
  flex: 1;
`;

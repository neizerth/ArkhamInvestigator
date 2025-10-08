import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";
import { size } from "../../../config";
import { color } from "../../../config";

const Line = styled(View)`
	height: 1px;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: ${color.light10};
`;

const Container = styled(View)`
	width: 100%;
  padding: ${size.gap.default}px 0;
`;

export type RuleProps = ViewProps & {
	contentContainerStyle?: ViewProps["style"];
};

export const Rule = ({ contentContainerStyle, ...props }: RuleProps) => {
	return (
		<Container style={contentContainerStyle}>
			<Line {...props} />
		</Container>
	);
};

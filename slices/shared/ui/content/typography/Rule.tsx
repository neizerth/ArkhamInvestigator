import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";
import { size } from "../../../config";
import { color } from "../../../config";

const Line = styled(View)`
  width: 100%;
  background-color: ${color.light10};
  margin: ${size.gap.default}px 0;
`;

const Container = styled(View)`
  margin: ${size.gap.default}px 0;
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

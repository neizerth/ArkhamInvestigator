import type { ViewProps } from "react-native";
import * as C from "./InvestigatorListSeparator.components";

export type InvestigatorListSeparatorProps = ViewProps;

export const InvestigatorListSeparator = ({
	children,
	...props
}: InvestigatorListSeparatorProps) => {
	return (
		<C.Container {...props}>
			<C.SeparatorBefore />
			<C.Content>
				<C.Text>{children}</C.Text>
				<C.RuleContainer>
					<C.Rule />
				</C.RuleContainer>
			</C.Content>
			<C.SeparatorAfter />
		</C.Container>
	);
};

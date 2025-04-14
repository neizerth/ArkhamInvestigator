import type { ViewProps } from "react-native";
import * as C from "./InvestigatorListSeparator.components";

export type InvestigatorListSeparatorProps = ViewProps;

export const InvestigatorListSeparator = ({
	children,
	...props
}: InvestigatorListSeparatorProps) => {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.SeparatorBefore />
				<C.Text>{children}</C.Text>
				<C.RuleContainer>
					<C.Rule />
				</C.RuleContainer>
				<C.SeparatorAfter />
			</C.Content>
		</C.Container>
	);
};

import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { selectTimingRules } from "../../lib";
import * as C from "./RoundReference.components";

export type RoundReferenceProps = ViewProps;

export const RoundReference = (props: RoundReferenceProps) => {
	const rules = useAppSelector(selectTimingRules);

	if (!rules?.table) {
		return;
	}

	const { table, title } = rules;

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Title>
					<C.TitleText>{title}</C.TitleText>
				</C.Title>
			</C.Content>
		</C.Container>
	);
};

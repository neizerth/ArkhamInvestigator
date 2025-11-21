import type { ReferenceCardTokenOption } from "arkham-investigator-data";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceOption.components";

export type ScenarioReferenceOptionProps = ViewProps & {
	option: ReferenceCardTokenOption;
};

export const ScenarioReferenceOption = ({
	children,
	option,
	...props
}: ScenarioReferenceOptionProps) => {
	const onPress = useCallback(() => {
		console.log(option);
	}, [option]);

	return (
		<C.Container {...props}>
			<C.Control onPress={onPress}>{children}</C.Control>
		</C.Container>
	);
};

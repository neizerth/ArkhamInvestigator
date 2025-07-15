import { characters } from "@shared/config";
import type { TextProps, ViewProps } from "react-native";
import * as C from "./ChaosTokenCounter.components";

export type ChaosTokenCounterProps = TextProps & {
	contentContainerStyle?: ViewProps["style"];
	value: number;
};

export const ChaosTokenCounter = ({
	value,
	contentContainerStyle,
	...props
}: ChaosTokenCounterProps) => {
	return (
		<C.Container>
			<C.Count {...props}>
				{characters.multiply}
				{value}
			</C.Count>
		</C.Container>
	);
};

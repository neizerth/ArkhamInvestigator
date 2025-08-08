import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import type { ViewProps } from "react-native";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenPreviewValue.components";

export type ChaosTokenPreviewValueProps = ViewProps & {
	value: ChaosTokenValue;
	type: ChaosTokenType;
	size: number;
};

export const ChaosTokenPreviewValue = ({
	size,
	type,
	value,
	...props
}: ChaosTokenPreviewValueProps) => {
	return (
		<C.Container {...props}>
			{value === "success" && <C.AutoSuccess type={type} size={size} />}
			{value === "fail" && <C.AutoFail type={type} size={size} />}
			{typeof value === "number" && (
				<C.Value type={type} size={size} value={value} />
			)}
		</C.Container>
	);
};

import { characters } from "@shared/config";
import type { NumericControlProps } from "../../../../haptic";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenInput.components";

export type ChaosTokenInputProps = NumericControlProps & {
	type: ChaosTokenType;
	showValue?: boolean;
};

export const ChaosTokenInput = ({
	type,
	showValue,
	...props
}: ChaosTokenInputProps) => {
	const { value } = props;
	return (
		<C.Control {...props}>
			<C.Content>
				{showValue && <C.Value>{`${characters.multiply}${value}`}</C.Value>}
				<C.Token type={type} />
			</C.Content>
		</C.Control>
	);
};

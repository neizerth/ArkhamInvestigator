import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValueProps } from "@modules/chaos-bag/base/shared/ui";
import { signedNumber } from "@shared/lib";
import { isString } from "mathjs";
import * as C from "./ResultValue.components";

export type ResultValueProps = Omit<ChaosTokenValueProps, "type"> & {
	fail?: boolean;
};

export const ResultValue = ({ fail, ...props }: ResultValueProps) => {
	const type: ChaosTokenType = fail ? "autoFail" : "elderSign";
	const sign = fail ? "-" : "+";
	const value = isString(props.value)
		? props.value
		: signedNumber(props.value, sign);

	return <C.Value {...props} type={type} value={value} stroke />;
};

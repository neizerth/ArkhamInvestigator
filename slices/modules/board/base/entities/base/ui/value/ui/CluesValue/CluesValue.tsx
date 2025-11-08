import { range } from "ramda";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./CluesValue.components";

export type CluesValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
	data: range(0, 101),
});

export const CluesValue = ({ value, ...props }: CluesValueProps) => {
	return <Control {...props} value={value} />;
};

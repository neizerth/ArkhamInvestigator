import { range } from "ramda";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./DoomValue.components";

export type DoomValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
	data: range(0, 101),
});

export const DoomValue = ({ value, ...props }: DoomValueProps) => {
	return <Control {...props} value={value} />;
};

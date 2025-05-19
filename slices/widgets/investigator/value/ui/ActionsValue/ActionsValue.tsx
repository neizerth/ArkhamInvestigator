import { range } from "ramda";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./ActionsValue.components";

export type ActionsValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
	data: range(0, 101),
});

export const ActionsValue = ({ value, ...props }: ActionsValueProps) => {
	return <Control {...props} value={value} />;
};

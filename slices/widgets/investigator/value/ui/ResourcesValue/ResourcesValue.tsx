import { range } from "ramda";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./ResourcesValue.components";

export type ResourcesValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
	data: range(0, 101),
});

export const ResourcesValue = ({ value, ...props }: ResourcesValueProps) => {
	return <Control {...props} value={value} />;
};

import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./HealthValue.components";

export type HealthValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
});

export const HealthValue = ({ value, ...props }: HealthValueProps) => {
	return <Control {...props} value={value} />;
};

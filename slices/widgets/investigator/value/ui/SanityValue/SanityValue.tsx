import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./SanityValue.components";

export type SanityValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
});

export const SanityValue = ({ value, ...props }: SanityValueProps) => {
	return <Control {...props} value={value} />;
};

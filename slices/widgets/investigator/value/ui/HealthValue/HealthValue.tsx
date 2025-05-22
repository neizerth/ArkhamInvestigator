import {
	selectCurrentBoardProp,
	selectShowInitialHealthAndSanity,
	useAppSelector,
} from "@shared/lib";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./HealthValue.components";

export type HealthValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
});

export const HealthValue = ({ value, ...props }: HealthValueProps) => {
	const showInitial = useAppSelector(selectShowInitialHealthAndSanity);
	const initialValue = useAppSelector(selectCurrentBoardProp("initialValue"));

	return (
		<Control {...props} value={value}>
			{showInitial && initialValue && (
				<C.Initial>
					<C.InitialValue value={initialValue?.health} />
				</C.Initial>
			)}
		</Control>
	);
};

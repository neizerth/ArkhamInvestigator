import {
	selectBoardProp,
	selectShowInitialHealthAndSanity,
	useAppSelector,
} from "@shared/lib";
import type { BoardId } from "@shared/model";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./HealthValue.components";

export type HealthValueProps = WithPickerValueProps & {
	boardId?: BoardId;
};

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
});

export const HealthValue = ({
	value,
	boardId = "current",
	...props
}: HealthValueProps) => {
	const showInitial = useAppSelector(selectShowInitialHealthAndSanity);
	const initialValue = useAppSelector(selectBoardProp(boardId, "initialValue"));

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

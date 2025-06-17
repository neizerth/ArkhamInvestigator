import type {
	InvestigatorBoardValues,
	InvestigatorBoardStat as Key,
	InvestigatorBoardValueProp as ValueProp,
} from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { type SetBoardPartPayload, setBoardPart } from "./setBoardPart";

export type SetBoardValuePropPartPayload<K extends Key> = Omit<
	SetBoardPartPayload,
	"data"
> & {
	prop: K;
	value?: InvestigatorBoardValues[K];
	baseValue?: InvestigatorBoardValues[K];
	initialValue?: InvestigatorBoardValues[K];
};

type PartialValue = Record<ValueProp, Partial<InvestigatorBoardValues>>;

const boardProps: ValueProp[] = ["value", "baseValue", "initialValue"];

export const setBoardValuePropPart =
	<K extends Key>(payload: SetBoardValuePropPartPayload<K>): AppThunk =>
	(dispatch) => {
		const data = boardProps.reduce((target, key) => {
			if (key in payload) {
				data[key] = {
					[key]: payload[key],
				};
			}
			return target;
		}, {} as PartialValue);

		dispatch(
			setBoardPart({
				...payload,
				data,
			}),
		);
	};

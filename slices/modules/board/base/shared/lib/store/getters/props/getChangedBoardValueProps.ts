import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import type { InvestigatorBoardNumericStat } from "@shared/model";

type Options = {
	current: InvestigatorBoardValues;
	changed: Partial<InvestigatorBoardValues>;
};

type ChangeItem = {
	prop: InvestigatorBoardNumericStat;
	value: number;
	prevValue: number;
};

export const getChangedBoardValueProps = ({ current, changed }: Options) => {
	const data: ChangeItem[] = [];

	for (const entry of Object.entries(changed)) {
		const [prop, value] = entry as [InvestigatorBoardNumericStat, number];
		const prevValue = current[prop];

		if (prevValue === value) {
			continue;
		}

		data.push({
			prop,
			value,
			prevValue,
		});
	}

	return data;
};

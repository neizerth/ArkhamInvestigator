import {
	selectFactionFilter,
	setFactionFilter,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { FactionFilterType } from "@shared/model";
import {
	FactionSelect as Select,
	type FactionSelectProps as SelectProps,
} from "@widgets/investigator/faction/faction-select";
import { useCallback } from "react";

export type FactionSelectProps = Omit<SelectProps, "value">;

export const FactionSelect = (props: FactionSelectProps) => {
	const dispatch = useAppDispatch();
	const faction = useAppSelector(selectFactionFilter);

	const onChange = useCallback(
		(value: FactionFilterType | null) => {
			dispatch(setFactionFilter(value));
		},
		[dispatch],
	);

	return <Select {...props} onChange={onChange} value={faction} />;
};

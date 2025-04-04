import { setFactionFilter, useAppDispatch } from "@shared/lib";
import type { FactionFilterType } from "@shared/model";
import {
	FactionSelect as Select,
	type FactionSelectProps as SelectProps,
} from "@widgets/investigator/faction/faction-select";
import { useCallback } from "react";

export type FactionSelectProps = SelectProps;

export const FactionSelect = ({ value, ...props }: FactionSelectProps) => {
	const dispatch = useAppDispatch();

	const onChange = useCallback(
		(value: FactionFilterType) => {
			dispatch(setFactionFilter(value));
		},
		[dispatch],
	);

	return <Select {...props} onChange={onChange} value={value} />;
};

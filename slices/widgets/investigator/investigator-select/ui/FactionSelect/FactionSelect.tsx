import { setFactionFilter, useAppDispatch } from "@shared/lib";
import type { FactionFilterType } from "@shared/model";
import { useCallback } from "react";
import {
	FactionSelect as Select,
	type FactionSelectProps as SelectProps,
} from "../../../faction/faction-select";

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

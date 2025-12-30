import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { factionFilterTypes } from "@modules/faction/shared/config";
import type { Faction } from "@modules/faction/shared/model";
import {
	FactionSelect as Select,
	type FactionSelectProps as SelectProps,
} from "@modules/faction/shared/ui/faction-select";
import { setFactionFilter } from "@modules/signature/signature-selection/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { FactionFilterType } from "@shared/model";
import { useCallback } from "react";

export type FactionSelectProps = Omit<SelectProps, "filters">;

const defautlFilters: Faction[] = [
	"guardian",
	"seeker",
	"rogue",
	"mystic",
	"survivor",
];

export const FactionSelect = ({ value, ...props }: FactionSelectProps) => {
	const dispatch = useAppDispatch();

	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	const filters = artworksEnabled ? factionFilterTypes : defautlFilters;
	const onChange = useCallback(
		(value: FactionFilterType) => {
			dispatch(setFactionFilter(value));
		},
		[dispatch],
	);

	return (
		<Select {...props} onChange={onChange} value={value} filters={filters} />
	);
};

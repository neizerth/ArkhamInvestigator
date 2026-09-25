import type { FactionFilterType } from "@modules/faction/shared/model";
import { selectAvailableSignatureGroups } from "@modules/signature/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { getSignatureSections } from "./getSignatureSections";

type Options = {
	faction: FactionFilterType;
	artworksEnabled: boolean;
	columns: number;
};

export const useSignatureSections = (options: Options) => {
	const { faction, artworksEnabled } = options;
	const columns = artworksEnabled ? options.columns : 1;

	const signatureGroups = useAppSelector(selectAvailableSignatureGroups);

	return useMemo(() => {
		return getSignatureSections({
			signatureGroups,
			artworksEnabled,
			faction,
			columns,
		});
	}, [artworksEnabled, signatureGroups, faction, columns]);
};

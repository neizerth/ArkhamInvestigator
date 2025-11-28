import type { BoardId } from "@modules/board/base/shared/model";
import type { Options } from "@modules/chaos-bag/odds/entities/lib/logic/getChaosOdds";
import { useAppSelector } from "@shared/lib";
import { useEffect, useRef, useState } from "react";
import { getChaosOdds } from "../../logic";
import { selectBoardChaosBagOddsOptions } from "../selectors/selectBoardChaosBagOdds";

export const useBoardChaosBagOdds = (boardId: BoardId) => {
	const options = useAppSelector(selectBoardChaosBagOddsOptions(boardId));
	const [odds, setOdds] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const optionsKeyRef = useRef<string>("");
	const optionsRef = useRef<Options>(options);

	// Update options ref whenever options change
	optionsRef.current = options;

	// Create a stable string representation of options for comparison
	const optionsKey = JSON.stringify(options);

	useEffect(() => {
		// Skip if options haven't actually changed
		if (optionsKeyRef.current === optionsKey) {
			return;
		}

		optionsKeyRef.current = optionsKey;

		let cancelled = false;

		const calculateOdds = async () => {
			setIsLoading(true);
			try {
				const result = await getChaosOdds(optionsRef.current);
				if (!cancelled) {
					setOdds(result);
					setIsLoading(false);
				}
			} catch (error) {
				if (!cancelled) {
					setOdds(null);
					setIsLoading(false);
				}
			}
		};

		calculateOdds();

		return () => {
			cancelled = true;
		};
	}, [optionsKey]);

	return { odds, isLoading };
};

export type CanAddRevealHistoryItemOptions = {
	chaosTokenCount: number;
};

export const canAddRevealHistoryItem = ({
	chaosTokenCount,
}: CanAddRevealHistoryItemOptions) => {
	return chaosTokenCount > 0;
};

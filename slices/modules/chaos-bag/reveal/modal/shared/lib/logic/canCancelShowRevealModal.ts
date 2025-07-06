export type CanCancelShowRevealModalOptions = {
	revealedTokensCount: number;
};

export const canCancelShowRevealModal = ({
	revealedTokensCount,
}: CanCancelShowRevealModalOptions) => {
	return revealedTokensCount > 0;
};

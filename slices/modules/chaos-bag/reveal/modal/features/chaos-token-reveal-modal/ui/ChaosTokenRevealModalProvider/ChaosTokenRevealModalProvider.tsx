import { type PropsWithChildren, useMemo, useState } from "react";
import { ChaosTokenRevealModalContext } from "../../lib";

export type ChaosTokenRevealModalProviderProps = PropsWithChildren;

export const ChaosTokenRevealModalProvider = ({
	children,
}: ChaosTokenRevealModalProviderProps) => {
	const [oneMoreLoading, setOneMoreLoading] = useState(false);

	const value = useMemo(() => {
		return {
			oneMoreLoading,
			setOneMoreLoading,
		};
	}, [oneMoreLoading]);

	return (
		<ChaosTokenRevealModalContext.Provider value={value}>
			{children}
		</ChaosTokenRevealModalContext.Provider>
	);
};

import { createContext } from "react";

type ContextData = {
	oneMoreLoading: boolean;
	setOneMoreLoading: (value: boolean) => void;
};
export const ChaosTokenRevealModalContext = createContext<ContextData>({
	oneMoreLoading: false,
	setOneMoreLoading: (f) => f,
});

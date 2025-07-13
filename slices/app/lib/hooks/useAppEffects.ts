import { useRouteChanges } from "@shared/lib/hooks/router/useRouteChanges";

export const useAppEffects = () => {
	useRouteChanges();
};

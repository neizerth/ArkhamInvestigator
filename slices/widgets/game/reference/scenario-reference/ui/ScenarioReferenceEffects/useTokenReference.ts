import { getChaosBagTokenReference } from "@features/game/chaos-bag";
import { selectReferenceCardText, useAppSelector } from "@shared/lib";

export const useTokenReference = () => {
	const text = useAppSelector(selectReferenceCardText) || "";

	const reference = getChaosBagTokenReference([text]);

	const small = text.length > 490;

	return [reference, small] as [typeof reference, boolean];
};

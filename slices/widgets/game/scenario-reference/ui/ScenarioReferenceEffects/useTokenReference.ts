import { getChaosBagTokenRefence } from "@features/chaos-bag";
import { selectReferenceCardText, useAppSelector } from "@shared/lib";

export const useTokenReference = () => {
	const text = useAppSelector(selectReferenceCardText) || "";

	const reference = getChaosBagTokenRefence([text]);

	const small = text.length > 490;

	return [reference, small] as [typeof reference, boolean];
};

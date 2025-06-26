import {
	selectReferenceCardText,
	selectReferenceCardTokenEffects,
	useAppSelector,
} from "@shared/lib";

export const useTokenReference = () => {
	const text = useAppSelector(selectReferenceCardText) || "";
	const reference = useAppSelector(selectReferenceCardTokenEffects);

	const small = text.length > 420;

	return [reference, small] as [typeof reference, boolean];
};

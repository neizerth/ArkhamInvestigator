import type { BaseListProps } from "../BaseList.types";
import { useScrollEnd } from "./useScrollEnd";
import { useUserActivation } from "./useUserActivation";
import { useValue } from "./useValue";

export const useFeatures = (props: BaseListProps) => {
	const valueProps = useValue(props);
	const activationProps = useUserActivation(valueProps);
	const scrollProps = useScrollEnd(activationProps);

	return scrollProps;
};

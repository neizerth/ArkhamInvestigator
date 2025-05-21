import { selectStory, useAppSelector } from "@shared/lib";

export const useReferenceCards = () => {
	const story = useAppSelector(selectStory);
};

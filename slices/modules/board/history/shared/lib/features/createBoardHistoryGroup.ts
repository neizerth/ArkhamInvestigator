import { v4 } from "uuid";

export const createBoardHistoryGroup = () => ({
	id: v4(),
	type: "group" as const,
});

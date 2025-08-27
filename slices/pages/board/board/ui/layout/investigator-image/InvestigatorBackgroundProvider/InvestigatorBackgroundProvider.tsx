import { selectBoardId } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorBackgroundProvider.components";

export type InvestigatorBackgroundProviderProps = ViewProps;
export const InvestigatorBackgroundProvider = (
	props: InvestigatorBackgroundProviderProps,
) => {
	const boardId = useAppSelector(selectBoardId("current"));

	return (
		<C.Container {...props}>
			<C.Background boardId={boardId} />
		</C.Container>
	);
};

import { useAppTranslation } from "@features/i18n";
import { useModal } from "@features/modal";
import { routes } from "@shared/config";
import {
	resetBoard,
	selectBoardProp,
	selectCurrentFaction,
	useAppDispatch,
	useAppSelector,
	usePage,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./DescriptionTopMenu.components";

export type DescriptionTopMenuProps = ViewProps;

export const DescriptionTopMenu = ({ ...props }: DescriptionTopMenuProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const investigator = useAppSelector(selectBoardProp("investigator"));
	const faction = useAppSelector(selectCurrentFaction);

	const goToPage = usePage();

	const clear = useCallback(() => {
		dispatch(resetBoard());
	}, [dispatch]);

	const [showClearModal] = useModal({
		id: "clear-board",
		data: {
			type: "faction",
			faction,
			title: t`Reset Board?`,
			subtitle: t(investigator.name),
			text: t`board.reset.text`,
			okText: t`Reset`,
			cancelText: t`Cancel`,
		},
		onOk: clear,
	});

	return (
		<C.Container {...props}>
			<C.Button icon="resign" onPress={goToPage(routes.home)} />
			<C.Button icon="question" onPress={goToPage(routes.boardHelp)} />
			<C.Button icon="wrench" onPress={goToPage(routes.settings)} />
			<C.Button icon="repeat" onPress={showClearModal} />
		</C.Container>
	);
};

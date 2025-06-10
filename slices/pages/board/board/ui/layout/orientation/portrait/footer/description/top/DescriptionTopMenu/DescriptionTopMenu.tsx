import { useModal } from "@features/modal";
import { useAppTranslation } from "@modules/i18n/shared/lib";
import { routes } from "@shared/config";
import {
	replacePageTo,
	resetBoard,
	selectCurrentBoardProp,
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

	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const faction = useAppSelector(selectCurrentFaction);

	const goToPage = usePage();

	const goHome = useCallback(() => {
		dispatch(replacePageTo(routes.home));
	}, [dispatch]);

	const clear = useCallback(() => {
		dispatch(resetBoard());
	}, [dispatch]);

	const [showClearModal] = useModal({
		id: "clear-board",
		data: {
			contentType: "text",
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
			<C.GoHome icon="resign" onPress={goHome} />
			<C.Button icon="info" onPress={goToPage(routes.boardHelp)} />
			<C.Button icon="stopwatch" onPress={goToPage(routes.roundReference)} />
			<C.Button icon="wrench" onPress={goToPage(routes.settings)} />
			<C.Button icon="repeat" onPress={showClearModal} />
		</C.Container>
	);
};

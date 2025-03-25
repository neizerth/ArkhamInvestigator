import { routes } from "@shared/config";
import { goToPage, resetBoard, selectCurrentBoard, useAppDispatch, useAppSelector, usePage } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./DescriptionTopMenu.components";
import { openModal, useModal } from "@features/modal";
import { useFaction } from "@pages/board/lib";
import { useAppTranslation } from "@features/i18n";

export type DescriptionTopMenuProps = ViewProps;

export const DescriptionTopMenu = ({ ...props }: DescriptionTopMenuProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const { faction } = useFaction();
	const { investigator } = useAppSelector(selectCurrentBoard);

	const goToPage = usePage();

	const clear = useCallback(() => {
		dispatch(resetBoard());
	}, [dispatch]);

	const [showClearModal] = useModal({
		id: 'clear-board',
		data: {
			type: 'faction',
			faction,
			title: t`Reset Board?`,
			subtitle: t(investigator.name),
			text: t`board.reset.text`,
			okText: t`Reset`,
			cancelText: t`Cancel`
		},
		onOk: clear
	})

	return (
		<C.Container {...props}>
			<C.Button icon="resign" onPress={goToPage(routes.home)} />
			<C.Button icon="question" onPress={goToPage(routes.boardHelp)} />
			<C.Button icon="repeat" onPress={showClearModal} />
		</C.Container>
	);
};

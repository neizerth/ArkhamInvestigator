import { isBoardSelectModalData } from "@modules/core/modal/entities/board-select/lib";
import { BoardSelectModal } from "@modules/core/modal/entities/board-select/ui";
import {
	selectModalData,
	selectModalId,
	selectModalType,
	selectModalValue,
} from "@modules/core/modal/shared/base/lib";
import { isConfirmModalData } from "@modules/core/modal/shared/confirm/lib";
import { Confirm } from "@modules/core/modal/shared/confirm/ui";
import { isPromptModalData } from "@modules/core/modal/shared/prompt/lib";
import { Prompt } from "@modules/core/modal/shared/prompt/ui";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";

export type ActiveModalProps = ViewProps;
export const ActiveModal = (props: ActiveModalProps) => {
	const id = useAppSelector(selectModalId);
	const data = useAppSelector(selectModalData);
	const type = useAppSelector(selectModalType);
	const value = useAppSelector(selectModalValue);

	if (!id || !data || !type) {
		return null;
	}

	if (isConfirmModalData(data, type)) {
		return <Confirm {...props} data={data} />;
	}

	if (isPromptModalData(data, type)) {
		return <Prompt data={data} />;
	}

	if (isBoardSelectModalData(data, type)) {
		const boardId = value as number;
		return <BoardSelectModal data={data} value={boardId} />;
	}

	return null;
};

import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { SignatureBackgroundProps } from "@modules/signature/shared/ui";
import { memo } from "react";
import * as C from "./InvestigatorImageBackground.components";
import { useBackground } from "./useBackground";

export type InvestigatorImageBackgroundProps = PropsWithBoardId &
	Omit<SignatureBackgroundProps, "type" | "code" | "layout">;

export const InvestigatorImageBackground = ({
	boardId,
	...props
}: InvestigatorImageBackgroundProps) => {
	const background = useBackground(boardId);

	if (!background) {
		return;
	}

	return <C.Background {...props} {...background} type="full" />;
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);

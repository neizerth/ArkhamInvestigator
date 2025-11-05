import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import {
	SignaturePreview,
	type SignaturePreviewProps,
} from "@modules/signature/base/entities/ui";
import { useAppSelector } from "@shared/lib";

export type BoardSignaturePreviewProps = PropsWithBoardId &
	Omit<SignaturePreviewProps, "code" | "faction">;

export const BoardSignaturePreview = ({
	boardId,
	...props
}: BoardSignaturePreviewProps) => {
	const { id } = useAppSelector(selectBoardProp({ boardId, prop: "image" }));
	const { faction_code } = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "investigator",
		}),
	);

	return <SignaturePreview {...props} code={id} faction={faction_code} />;
};

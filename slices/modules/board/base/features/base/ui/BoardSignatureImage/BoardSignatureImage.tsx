import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import {
	SignatureImage,
	type SignatureImageProps,
} from "@modules/signature/base/entities/ui";
import { useAppSelector } from "@shared/lib";

export type BoardSignatureImageProps = PropsWithBoardId &
	Omit<SignatureImageProps, "code">;

export const BoardSignatureImage = ({
	boardId,
	...props
}: BoardSignatureImageProps) => {
	const { id } = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "image",
		}),
	);
	return <SignatureImage {...props} code={id} />;
};

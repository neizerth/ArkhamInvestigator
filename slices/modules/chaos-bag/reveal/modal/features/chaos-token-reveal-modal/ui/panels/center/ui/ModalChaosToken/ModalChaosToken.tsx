import { selectCurrentBoardId } from "@modules/board/base/shared/lib";
import {
	isNumericChaosTokenType,
	selectModifyChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenPreviewProps } from "@modules/chaos-bag/base/shared/ui";
import { selectChaosTokenValueByType } from "@modules/chaos-bag/value/features/lib";
import { getDefaultChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import { useAppSelector } from "@shared/lib";
import * as C from "./ModalChaosToken.components";
export type ModalChaosTokenProps = ChaosTokenPreviewProps;

export const ModalChaosToken = (props: ModalChaosTokenProps) => {
	const { type } = props;
	const canModify = useAppSelector(selectModifyChaosTokens);
	const boardId = useAppSelector(selectCurrentBoardId);
	const value = useAppSelector(
		selectChaosTokenValueByType({
			type,
			boardId,
		}),
	);
	const isNumeric = isNumericChaosTokenType(type);
	const defaultValue = getDefaultChaosTokenValue(type);

	const highlight = canModify ? !isNumeric : true;

	return (
		<C.Token
			{...props}
			highlight={highlight}
			value={value}
			defaultValue={defaultValue}
		/>
	);
};

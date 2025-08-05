import {
	isNumericChaosTokenType,
	selectModifyChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenPreviewProps } from "@modules/chaos-bag/base/shared/ui";
import { getDefaultChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import { useAppSelector } from "@shared/lib";
import * as C from "./ModalChaosToken.components";
export type ModalChaosTokenProps = ChaosTokenPreviewProps & {
	value?: number;
};

export const ModalChaosToken = (props: ModalChaosTokenProps) => {
	const { type } = props;
	const canModify = useAppSelector(selectModifyChaosTokens);

	const isNumeric = isNumericChaosTokenType(type);
	const defaultValue = getDefaultChaosTokenValue(type);

	const highlight = canModify ? !isNumeric : true;

	return (
		<C.Token {...props} highlight={highlight} defaultValue={defaultValue} />
	);
};

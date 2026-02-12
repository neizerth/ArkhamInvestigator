import {
	selectReplaceSignature,
	selectSelectedSignatures,
} from "@modules/signature/signature-selection/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { ClearButton } from "../ClearButton";
import { StartButton } from "../StartButton";
import * as C from "./SignatureSelectFooter.components";

export type SignatureSelectFooterProps = ViewProps;

export const SignatureSelectFooter = (props: SignatureSelectFooterProps) => {
	const signatures = useAppSelector(selectSelectedSignatures);
	const replaceSignature = useAppSelector(selectReplaceSignature);
	const selectedSignatures = signatures ?? [];

	if (selectedSignatures.length === 0) {
		return null;
	}
	return (
		<C.Container {...props} replaceSignature={replaceSignature}>
			{!replaceSignature && <ClearButton />}
			<StartButton />
		</C.Container>
	);
};

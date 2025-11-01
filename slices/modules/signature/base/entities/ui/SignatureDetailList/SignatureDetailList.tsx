import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import * as C from "./SignatureDetailList.components";

export type SignatureDetailListProps = ViewProps & {
	data: Item[];
	disabled?: string[];
	size: number;
	selectedId?: string | null;
	onChange: (item: Item | null, index?: number) => void;
};

export const SignatureDetailList = ({
	data,
	disabled,
	size,
	selectedId,
	onChange,
	...props
}: SignatureDetailListProps) => {
	const { t } = useTranslation();

	return (
		<C.Container {...props}>
			{data.map((item) => (
				<C.Item key={item.id} onPress={() => onChange(item)}>
					<C.IconContainer>
						<C.PackIcon
							icon={item.icon || "investigator"}
							faction={item.faction}
							selected={selectedId === item.id}
						/>
					</C.IconContainer>
					<C.Title faction={item.faction} selected={selectedId === item.id}>
						{t(item.name)}
					</C.Title>
				</C.Item>
			))}
		</C.Container>
	);
};

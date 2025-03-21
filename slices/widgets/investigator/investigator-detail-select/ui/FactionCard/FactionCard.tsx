import { useAppTranslation } from "@features/i18n";
import {
	goBack,
	removeInvestigatorSelection,
	useAppDispatch,
	useLayoutSize,
} from "@shared/lib";
import type { PropsWithFaction } from "@shared/model/ui";
import { Outside } from "@shared/ui";
import { memo, useCallback, useMemo, useState } from "react";
import {
	type LayoutChangeEvent,
	type ViewProps,
	useWindowDimensions,
} from "react-native";
import * as C from "./FactionCard.components";

export type InvestigatorDetailSelectCardProps = ViewProps &
	PropsWithFaction & {
		title?: string;
		subtitle?: string;
		onClose?: () => void;
		onOk?: () => void;
		onCancel?: () => void;
	};

const MAX_HEIGHT_AREA = 146;

export const InvestigatorDetailSelectCard = ({
	faction,
	title,
	subtitle,
	children,
	onClose,
	onOk,
	onCancel,
	onTouchCancel,
	...props
}: InvestigatorDetailSelectCardProps) => {
	const { t } = useAppTranslation();

	const window = useWindowDimensions();
	const [size, onLayout] = useLayoutSize(window);

	const [containerSize, onContainerLayout] = useLayoutSize();

	const maxHeight = size.height + MAX_HEIGHT_AREA;

	const style = size
		? {
				maxHeight,
			}
		: {};

	const containerStyle = {
		opacity: size ? 1 : 0,
	};

	return (
		<C.Container
			{...props}
			style={[style, props.style, containerStyle]}
			onLayout={onContainerLayout}
		>
			<C.Header faction={faction}>
				{containerSize && (
					<C.Background
						faction={faction}
						width={containerSize.width}
						height={55}
					/>
				)}
				<C.HeaderContent>
					<C.Icon faction={faction} />
					<C.HeaderTextContent>
						<C.Title>{title}</C.Title>
						<C.Subtitle>{subtitle}</C.Subtitle>
					</C.HeaderTextContent>
					{onClose && (
						<C.Close onPress={onClose}>
							<C.CloseIcon />
						</C.Close>
					)}
				</C.HeaderContent>
			</C.Header>
			<C.Body faction={faction}>
				<C.Content>
					<C.ScrollContainer>
						<C.ScrollContent onLayout={onLayout}>{children}</C.ScrollContent>
					</C.ScrollContainer>
					<C.Actions>
						{onCancel && (
							<C.Cancel text={t`Cancel`} icon="dismiss" onPress={onCancel} />
						)}
						{onOk && (
							<C.OK
								text={t`Okay`}
								faction={faction}
								icon="check"
								onPress={onOk}
							>
								<C.OKBackground
									faction={faction}
									width={containerSize?.width || 300}
									height={55}
								/>
							</C.OK>
						)}
					</C.Actions>
				</C.Content>
			</C.Body>
		</C.Container>
	);
};

export const InvestigatorDetailSelectCardMemo = memo(
	InvestigatorDetailSelectCard,
);

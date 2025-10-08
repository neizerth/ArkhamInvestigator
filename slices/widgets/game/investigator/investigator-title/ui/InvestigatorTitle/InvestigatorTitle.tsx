import { titleImages } from "@assets/images/game/title";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { formatGameText, getActiveOpacity, getFactionImage } from "@shared/lib";
import type { PropsWithFaction } from "@shared/model";
import type { ImageBackgroundProps } from "@shared/ui";
import { memo, useMemo } from "react";
import type { ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./InvestigatorTitle.components";
import { getTitleStyle } from "./InvestigatorTitle.styles";

type PressCallback = () => void;

export type InvestigatorTitleProps = Omit<ImageBackgroundProps, "source"> &
	InvestigatoTitleBaseProps & {
		contentContainerStyle?: ViewStyle;
		onTitlePress?: PressCallback;
		onPress?: PressCallback;
		onNextPress?: PressCallback;
		onPrevPress?: PressCallback;
		width: number;
		height: number;
		showArrows?: boolean;
		pressable?: boolean;
	};

export type InvestigatoTitleBaseProps = PropsWithFaction & {
	entityId: number;
	single: boolean;
	parallel: boolean;
	unique: boolean;
	name: string;
	subname: string;
	language: string;
};

export const InvestigatorTitle = (props: InvestigatorTitleProps) => {
	const {
		contentContainerStyle,
		showArrows = true,
		pressable = false,
		faction,
		parallel,
		onPrevPress,
		onNextPress,
		onTitlePress,
		onPress,
		unique,
		entityId,
		single,
	} = props;

	const name = formatGameText(props.name);
	const subname = formatGameText(props.subname);

	const source = getFactionImage({
		images: titleImages,
		parallel,
		faction,
	});

	const style = getTitleStyle(props);
	const titleOpacity = getActiveOpacity(pressable);

	const showId = !unique && !single;

	const isLargeName = name.length > 15;

	const swipeLeft = useSwipe({
		direction: "left",
		onSwipe: onNextPress,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: onPrevPress,
	});

	const gestures = useMemo(
		() => [swipeLeft, swipeRight],
		[swipeLeft, swipeRight],
	);

	const gesture = Gesture.Exclusive(...gestures);

	return (
		<C.Container style={[contentContainerStyle]}>
			<C.Background
				{...props}
				source={source}
				style={[props.style, style.background]}
			>
				<C.Activation onPress={onPress} />
				<C.Title style={style.title}>
					<C.TitleContainer>
						{showArrows && (
							<C.Left
								onPress={onPrevPress}
								style={style.arrow}
								compact={isLargeName}
							>
								<C.Arrow parallel={parallel} />
							</C.Left>
						)}

						<GestureDetector gesture={gesture}>
							<C.TitleContent
								style={style.titleContent}
								activeOpacity={titleOpacity}
								onPress={onTitlePress}
							>
								{unique && <C.Unique style={style.unique} />}

								<C.TitleText style={style.titleText}>{name}</C.TitleText>

								{showId && <C.Id style={style.id}> ({entityId})</C.Id>}
							</C.TitleContent>
						</GestureDetector>

						{showArrows && (
							<C.Right
								onPress={onNextPress}
								style={style.arrow}
								compact={isLargeName}
							>
								<C.RightArrow>
									<C.Arrow parallel={parallel} />
								</C.RightArrow>
							</C.Right>
						)}
					</C.TitleContainer>
				</C.Title>
				<C.Subtitle style={style.subtitle}>
					<C.SubtitleText style={style.subtitleText}>{subname}</C.SubtitleText>
				</C.Subtitle>
			</C.Background>
		</C.Container>
	);
};

export const InvestigatorTitleMemo = memo(InvestigatorTitle);

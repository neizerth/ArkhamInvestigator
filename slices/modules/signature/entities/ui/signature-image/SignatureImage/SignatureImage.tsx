import { AnimatedSignatureImage } from "../AnimatedSignatureImage";
import {
	StaticSignatureImage,
	type StaticSignatureImageProps,
} from "../StaticSignatureImage";

export type SignatureImageProps = StaticSignatureImageProps & {
	animated?: boolean;
};

export const SignatureImage = ({ animated, ...props }: SignatureImageProps) => {
	const Component = animated ? AnimatedSignatureImage : StaticSignatureImage;
	return <Component {...props} />;
};

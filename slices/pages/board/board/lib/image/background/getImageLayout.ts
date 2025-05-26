import {
	getCoverScaleAt,
	scaleBox,
	scaleBoxLayout,
	scaleBoxPosition,
} from "@shared/lib";
import { getBoxCenter, getBoxLayoutCenter } from "@shared/lib/util/size/box";
import type { InvestigatorImage } from "@shared/model";
import type { Box } from "@shared/model/ui";
import { faceSize } from "../../../config";

type GetImageLayout = {
	view: Box;
	image: InvestigatorImage;
	offsetBottom?: number;
};

export const getImageLayout = ({
	image,
	view,
	offsetBottom = 0,
}: GetImageLayout) => {
	const { face } = image;

	const vh = view.height / 100;
	const faceScale = {
		min: (faceSize.min * vh) / face.height,
		max: (faceSize.max * vh) / face.height,
	};

	const imageCenter = getBoxCenter(image);
	const faceCenter = getBoxLayoutCenter(face);

	const offset = {
		top: faceCenter.top - imageCenter.top + offsetBottom,
		left: faceCenter.left - imageCenter.left,
	};

	const faceImage = {
		width: image.width + offset.left,
		height: image.height + offset.top,
	};

	const minScale = getCoverScaleAt({
		position: faceCenter,
		view,
		box: faceImage,
	});

	const scale = Math.max(minScale, faceScale.min);

	const scaledImage = scaleBox(image, scale);

	const scaledImageCenter = getBoxCenter(scaledImage);

	const viewCenter = getBoxCenter(view);
	const scaledOffset = scaleBoxPosition(offset, scale);

	const top = scaledImageCenter.top - viewCenter.top + scaledOffset.top;
	const left = scaledImageCenter.left - viewCenter.left + scaledOffset.left;
	const center = {
		top,
		left: Math.max(left, 0),
	};

	let result = {
		...scaledImage,
		...center,
	};

	if (result.width - result.left < view.width) {
		const scale = view.width / (result.width - result.left);
		result = scaleBoxLayout(result, scale);
	}

	if (result.height - result.top < view.height) {
		const scale = view.height / (result.height - result.top);
		result = scaleBoxLayout(result, scale);
	}

	return result;
};

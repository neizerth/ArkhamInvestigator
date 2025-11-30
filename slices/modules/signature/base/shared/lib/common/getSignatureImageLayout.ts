import type { InvestigatorImage } from "@shared/model";
import type { Box, RectPosition } from "@shared/model/ui";
import { faceSize } from "../../config";

type Options = {
	view: Box;
	image: InvestigatorImage;
	offset: RectPosition;
};
export function getSignatureImageLayout({
	view,
	image,
	offset = { top: 0, left: 0, right: 0, bottom: 0 },
}: Options) {
	const wV = view.width;
	const hV = view.height;
	const rV = wV / hV; // aspect ratio of the view (width/height)

	const wI = image.width;
	const hI = image.height;
	const { face } = image;

	if (!face || !wI || !hI) {
		return;
	}

	const cxI = face.left + face.width / 2;
	const cyI = face.top + face.height / 2;

	// Effective area inside the view after applying offsets
	const effectiveWidth = Math.max(1, wV - offset.left - offset.right);
	const effectiveHeight = Math.max(1, hV - offset.top - offset.bottom);

	// Desired normalized position of the face center in the view
	const uRaw = (offset.left + effectiveWidth / 2) / wV; // horizontal fraction [0..1]
	const vRaw = (offset.top + effectiveHeight / 2) / hV; // vertical fraction [0..1]
	const eps = 1e-9;
	const u = Math.min(Math.max(uRaw, eps), 1 - eps);
	const v = Math.min(Math.max(vRaw, eps), 1 - eps);

	// Face size constraints: ensure the face is neither too small nor too large
	const pMin = faceSize.min / 100;
	const pMax = faceSize.max / 100;

	const cropHMinFace = face.height / pMax; // smallest crop height allowed
	const cropHMaxFace = face.height / pMin; // largest crop height allowed

	// Image bounds: crop must fit inside the original image while keeping aspect ratio
	const imageBound = Math.min(hI, wI / rV);

	// Placement bounds: how large crop can be while keeping face at (u,v)
	const boundTop = cyI / v;
	const boundBottom = (hI - cyI) / (1 - v);
	const boundLeft = cxI / (u * rV);
	const boundRight = (hI - cxI) / ((1 - u) * rV);
	const placementBound = Math.min(boundTop, boundBottom, boundLeft, boundRight);

	// Final crop height based on constraints
	const upperExact = Math.min(cropHMaxFace, imageBound, placementBound);
	const needClampPlacement = upperExact < cropHMinFace;

	const cropH = needClampPlacement ? cropHMinFace : upperExact;
	const cropW = rV * cropH;

	// Initial crop position so that face center lands at (u, v)
	let cropLeft = cxI - u * cropW;
	let cropTop = cyI - v * cropH;

	// Clamp crop inside the image without changing its size
	const clamp = (val: number, lo: number, hi: number) =>
		Math.min(Math.max(val, lo), hi);
	cropLeft = clamp(cropLeft, 0, Math.max(0, wI - cropW));
	cropTop = clamp(cropTop, 0, Math.max(0, hI - cropH));

	// Ensure all crop values are integers and within image bounds
	const ensureIntegerBounds = (value: number, maxValue: number) => {
		const clamped = Math.max(0, Math.min(Math.floor(value), maxValue));
		return Math.max(0, clamped);
	};

	// Round crop dimensions to integers and ensure they fit within image
	const cropWInt = Math.floor(cropW);
	const cropHInt = Math.floor(cropH);

	// Ensure crop dimensions don't exceed image size
	const finalCropWidth = Math.min(cropWInt, wI);
	const finalCropHeight = Math.min(cropHInt, hI);

	// Ensure crop position is integer and within bounds
	const finalCropLeft = ensureIntegerBounds(cropLeft, wI - finalCropWidth);
	const finalCropTop = ensureIntegerBounds(cropTop, hI - finalCropHeight);

	// Debug: aspect ratio should always match
	const actualRatio = finalCropWidth / finalCropHeight;
	if (Math.abs(actualRatio - rV) > 1e-3) {
		console.warn(`Aspect ratio mismatch: expected ${rV}, got ${actualRatio}`);
	}

	// Scale factor to map crop to the view
	const scale = hV / finalCropHeight;

	// Actual face size in % of the view height
	const faceHeightPercent = ((face.height * scale) / hV) * 100;

	// Achieved normalized position of the face center
	const achievedU = (cxI - finalCropLeft) / finalCropWidth;
	const achievedV = (cyI - finalCropTop) / finalCropHeight;

	return {
		crop: {
			left: finalCropLeft,
			top: finalCropTop,
			width: finalCropWidth,
			height: finalCropHeight,
		},
		scale,
		faceHeightPercent,
		exactPlacement: !needClampPlacement,
		target: { u: uRaw, v: vRaw }, // requested placement
		achieved: { u: achievedU, v: achievedV }, // actual placement
	};
}

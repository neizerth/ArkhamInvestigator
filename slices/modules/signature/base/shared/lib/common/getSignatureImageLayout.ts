import type { InvestigatorImage } from "@shared/model";
import type { Box } from "@shared/model/ui";
import { faceSize } from "../../config";

type Options = {
	view: Box;
	image: InvestigatorImage;
	offsetBottom: number;
};

export function getSignatureImageLayout({
	view,
	image,
	offsetBottom,
}: Options) {
	const wV = view.width;
	const hV = view.height;
	const rV = wV / hV; // screen aspect ratio

	const wI = image.width;
	const hI = image.height;

	// --- 1. Base crop with screen aspect ratio ---
	let cropW: number;
	let cropH: number;
	if (wI / hI >= rV) {
		// image is wider than screen → fit by height
		cropH = hI;
		cropW = rV * cropH;
	} else {
		// image is taller than screen → fit by width
		cropW = wI;
		cropH = cropW / rV;
	}

	// --- 2. Face center in image coordinates ---
	const face = image.face;
	const cxI = face.left + face.width / 2;
	const cyI = face.top + face.height / 2;

	// --- 3. Desired face position inside the crop ---
	const u = 0.5; // normalized X (horizontal center)
	const v = (hV - offsetBottom) / (2 * hV); // normalized Y (slightly above center if offsetBottom > 0)

	// --- 4. Initial scale and face size on screen ---
	let scale = hV / cropH;

	const faceHeightScreen = face.height * scale;
	let faceHeightPercent = (faceHeightScreen / hV) * 100;

	// --- 5. Enforce face size constraints (min/max percent of screen height) ---
	const minPercent = faceSize.min;
	const maxPercent = faceSize.max;

	if (faceHeightPercent < minPercent) {
		// face is too small → zoom in (smaller crop)
		scale = ((minPercent / 100) * hV) / face.height;
		cropH = hV / scale;
		cropW = rV * cropH;
		faceHeightPercent = minPercent;
	} else if (faceHeightPercent > maxPercent) {
		// face is too large → zoom out (larger crop)
		scale = ((maxPercent / 100) * hV) / face.height;
		cropH = hV / scale;
		cropW = rV * cropH;
		faceHeightPercent = maxPercent;
	}

	// --- 6. Position crop so that face center aligns with (u,v) inside the crop ---
	let cropLeft = cxI - u * cropW;
	let cropTop = cyI - v * cropH;

	// Clamp crop within image boundaries
	if (cropLeft < 0) cropLeft = 0;
	if (cropTop < 0) cropTop = 0;
	if (cropLeft + cropW > wI) cropLeft = wI - cropW;
	if (cropTop + cropH > hI) cropTop = hI - cropH;

	return {
		crop: { left: cropLeft, top: cropTop, width: cropW, height: cropH },
		scale,
		faceHeightPercent,
	};
}

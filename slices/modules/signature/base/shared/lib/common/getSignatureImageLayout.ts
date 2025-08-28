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
	const rV = wV / hV; // screen aspect ratio

	const wI = image.width;
	const hI = image.height;

	const face = image.face;
	const cxI = face.left + face.width / 2;
	const cyI = face.top + face.height / 2;

	// --- Effective working area inside screen (excluding offsets) ---
	const effectiveWidth = wV - offset.left - offset.right;
	const effectiveHeight = hV - offset.top - offset.bottom;

	// Normalized desired position of face center within crop:
	// - horizontally: middle of effective area
	// - vertically: middle of effective area
	const u = (offset.left + effectiveWidth / 2) / wV;
	const rawV = (offset.top + effectiveHeight / 2) / hV;

	const eps = 1e-9;
	const uSafe = Math.min(Math.max(u, eps), 1 - eps);
	const vSafe = Math.min(Math.max(rawV, eps), 1 - eps);

	// --- Face-size constraints ---
	const pMin = faceSize.min / 100;
	const pMax = faceSize.max / 100;

	const cropH_low_face = face.height / pMax;
	const cropH_high_face = face.height / pMin;

	// --- Image-fit bounds ---
	const image_bound = Math.min(hI, wI / rV);

	// --- Placement bounds to keep face at (u,v) ---
	const bound_top = cyI / vSafe;
	const bound_bottom = (hI - cyI) / (1 - vSafe);
	const bound_left = cxI / uSafe / rV;
	const bound_right = (wI - cxI) / (1 - uSafe) / rV;
	const placement_bound = Math.min(
		bound_top,
		bound_bottom,
		bound_left,
		bound_right,
	);

	const upperExact = Math.min(cropH_high_face, image_bound, placement_bound);

	let exactPlacement = true;
	let cropH: number;

	if (upperExact < cropH_low_face) {
		cropH = cropH_low_face;
		exactPlacement = false; // will clamp later
	} else {
		cropH = upperExact;
	}

	const cropW = rV * cropH;

	// --- Compute crop position ---
	let cropLeft = cxI - u * cropW;
	let cropTop = cyI - rawV * cropH;

	if (!exactPlacement) {
		if (cropLeft < 0) cropLeft = 0;
		if (cropTop < 0) cropTop = 0;
		if (cropLeft + cropW > wI) cropLeft = wI - cropW;
		if (cropTop + cropH > hI) cropTop = hI - cropH;
	}

	const scale = hV / cropH;
	const faceHeightPercent = ((face.height * scale) / hV) * 100;

	const achievedU = (cxI - cropLeft) / cropW;
	const achievedV = (cyI - cropTop) / cropH;

	return {
		crop: { left: cropLeft, top: cropTop, width: cropW, height: cropH },
		scale,
		faceHeightPercent,
		exactPlacement,
		target: { u, v: rawV },
		achieved: { u: achievedU, v: achievedV },
	};
}

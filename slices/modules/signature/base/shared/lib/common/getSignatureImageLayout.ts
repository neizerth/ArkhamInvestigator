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
	const face = image.face;

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

	const cropH_min_face = face.height / pMax; // smallest crop height allowed
	const cropH_max_face = face.height / pMin; // largest crop height allowed

	// Image bounds: crop must fit inside the original image while keeping aspect ratio
	const image_bound = Math.min(hI, wI / rV);

	// Placement bounds: how large crop can be while keeping face at (u,v)
	const bound_top = cyI / v;
	const bound_bottom = (hI - cyI) / (1 - v);
	const bound_left = cxI / (u * rV);
	const bound_right = (wI - cxI) / ((1 - u) * rV);
	const placement_bound = Math.min(
		bound_top,
		bound_bottom,
		bound_left,
		bound_right,
	);

	// Final crop height based on constraints
	const upperExact = Math.min(cropH_max_face, image_bound, placement_bound);
	const needClampPlacement = upperExact < cropH_min_face;

	const cropH = needClampPlacement ? cropH_min_face : upperExact;
	const cropW = rV * cropH;

	// Initial crop position so that face center lands at (u, v)
	let cropLeft = cxI - u * cropW;
	let cropTop = cyI - v * cropH;

	// Clamp crop inside the image without changing its size
	const clamp = (val: number, lo: number, hi: number) =>
		Math.min(Math.max(val, lo), hi);
	cropLeft = clamp(cropLeft, 0, Math.max(0, wI - cropW));
	cropTop = clamp(cropTop, 0, Math.max(0, hI - cropH));

	// Debug: aspect ratio should always match
	const actualRatio = cropW / cropH;
	if (Math.abs(actualRatio - rV) > 1e-6) {
		console.warn(`Aspect ratio mismatch: expected ${rV}, got ${actualRatio}`);
	}

	// Scale factor to map crop to the view
	const scale = hV / cropH;

	// Actual face size in % of the view height
	const faceHeightPercent = ((face.height * scale) / hV) * 100;

	// Achieved normalized position of the face center
	const achievedU = (cxI - cropLeft) / cropW;
	const achievedV = (cyI - cropTop) / cropH;

	return {
		crop: { left: cropLeft, top: cropTop, width: cropW, height: cropH },
		scale,
		faceHeightPercent,
		exactPlacement: !needClampPlacement,
		target: { u: uRaw, v: vRaw }, // requested placement
		achieved: { u: achievedU, v: achievedV }, // actual placement
	};
}

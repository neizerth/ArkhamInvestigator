import { NativeModule, registerWebModule } from "expo";

import type {
	GrayscaleModuleEvents,
	ToGrayscaleResult,
} from "./Grayscale.types";

class GrayscaleModule extends NativeModule<GrayscaleModuleEvents> {
	async toGrayscale(base64: string): Promise<ToGrayscaleResult> {
		try {
			// Strip data URI prefix if present
			let base64String = base64;
			if (base64.includes("base64,")) {
				const parts = base64.split("base64,");
				if (parts.length > 1) {
					base64String = parts[1];
				}
			}

			// Remove whitespace
			base64String = base64String.replace(/\s/g, "");

			// Convert to grayscale using canvas
			return new Promise((resolve) => {
				const img = new Image();
				img.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext("2d");

					if (!ctx) {
						resolve({ base64: "" });
						return;
					}

					// Draw the image
					ctx.drawImage(img, 0, 0);

					// Get image data
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					const data = imageData.data;

					// Convert to grayscale
					for (let i = 0; i < data.length; i += 4) {
						const gray =
							data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
						data[i] = gray; // red
						data[i + 1] = gray; // green
						data[i + 2] = gray; // blue
					}

					// Put the grayscale image data back
					ctx.putImageData(imageData, 0, 0);

					// Convert to base64
					const grayscaleBase64 = canvas
						.toDataURL("image/png")
						.split("base64,")[1];
					resolve({ base64: grayscaleBase64 });
				};

				img.onerror = () => {
					resolve({ base64: "" });
				};

				img.src = `data:image/png;base64,${base64String}`;
			});
		} catch (e) {
			return { base64: "" };
		}
	}
}

export default registerWebModule(GrayscaleModule, "Grayscale");

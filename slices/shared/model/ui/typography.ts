export type FontFace =
	| string
	| {
			default: string;
			bold?:
				| string
				| {
						default: string;
						italic?: string;
				  };
			italic?:
				| string
				| {
						default: string;
						bold?: string;
				  };
	  };

export type FontFamily = Partial<Record<FontFaceType | "default", string>>;

export type FontWeightName =
	| "bold"
	| "extraBold"
	| "black"
	| "regular"
	| "medium";

export type FontStyleName = "italic";

export type FontFaceType =
	| FontWeightName
	| FontStyleName
	| `${FontWeightName}${Capitalize<FontStyleName>}`;

export type FontFamilyFonts = Record<string, string>;

export type FontCategoryRecord = Record<string, FontFamilyFonts> & {
	common: FontFamilyFonts;
};

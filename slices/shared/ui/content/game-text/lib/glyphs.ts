export const haveKoreanGlyphs = (text: string) =>
	/[\u3131-\uD79D]/giu.test(text);
export const haveChineseGlyphs = (text: string) => /\p{Script=Han}/u.test(text);

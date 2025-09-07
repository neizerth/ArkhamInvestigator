import { FangSongFonts } from "./FangSong";
import { FZLiBianFonts } from "./FZLiBian";
import { FZShuTiFonts } from "./FZShuTi";
import { SourceHanSansCNFonts } from "./SourceHanSansCN";
import { ZhenShuaiFonts } from "./ZhenShuai";

export * from "./ZhenShuai";
export * from "./FZLiBian";
export * from "./SourceHanSansCN";
export * from "./FangSong";
export * from "./FZShuTi";

export default {
	...ZhenShuaiFonts,
	...FZLiBianFonts,
	...SourceHanSansCNFonts,
	...FangSongFonts,
	...FZShuTiFonts,
};

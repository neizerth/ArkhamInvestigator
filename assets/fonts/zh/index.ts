import { FangSongFonts } from "./FangSong";
import { FZLiBianFonts } from "./FZLiBian";
import { FZShuTiFonts } from "./FZShuTi";
import { SourceHanSansCNFonts } from "./SourceHanSansCN";
import { STXinweiFonts } from "./STXinwei";
import { ZhenShuaiFonts } from "./ZhenShuai";

export * from "./STXinwei";
export * from "./ZhenShuai";
export * from "./FZLiBian";
export * from "./SourceHanSansCN";
export * from "./FangSong";
export * from "./FZShuTi";

export default {
	...STXinweiFonts,
	...ZhenShuaiFonts,
	...FZLiBianFonts,
	...SourceHanSansCNFonts,
	...FangSongFonts,
	...FZShuTiFonts,
};

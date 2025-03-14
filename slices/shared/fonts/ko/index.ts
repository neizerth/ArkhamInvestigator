import { DXPnFonts } from "./DXPn";
import { SanCnFonts } from "./SanCn";
import { YoonFonts } from "./Yoon";

export * from './DXPn'
export * from './SanCn'
export * from './Yoon'

export default {
  ...SanCnFonts,
  ...YoonFonts,
  ...DXPnFonts,
}
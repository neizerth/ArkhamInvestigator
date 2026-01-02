import type { ImageRequireSource } from "react-native";
import game from "./game";
import ui from "./ui";
import theme from "./theme";
export const logoLight = require("./logo-light.png");

const images: ImageRequireSource[] = [...game, ...ui, ...theme, logoLight];

export default images;

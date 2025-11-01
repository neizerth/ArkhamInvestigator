import { ImageRequireSource } from "react-native";
import game from "./game";
import ui from "./ui";
import theme from "./theme";

const images: ImageRequireSource[] = [...game, ...ui, ...theme];

export default images;

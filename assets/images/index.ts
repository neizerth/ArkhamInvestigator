import { ImageRequireSource } from "react-native";
import game from "./game";
import ui from "./ui";

const images: ImageRequireSource[] = [...game, ...ui];

export default images;

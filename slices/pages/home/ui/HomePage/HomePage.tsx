import { PrimaryButton } from "../../../../shared/ui/control/PrimaryButton";
import { NewGameButton } from "../NewGameButton";
import * as C from "./HomePage.components";

export const HomePage = () => {
  return (
    <C.Container>
      <NewGameButton/>
    </C.Container>
  );
}
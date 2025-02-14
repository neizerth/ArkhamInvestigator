import { NewGameButton } from "../NewGameButton";
import { Container } from "./HomePage.components";
import { useAppData } from "@shared/lib/hooks";

export const HomePage = () => {
  useAppData();
  return (
    <Container>
      <NewGameButton/>
    </Container>
  );
}
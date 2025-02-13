import { View, Text } from "react-native";
import { Container } from "./HomePage.components";
import { NewGameButton } from "@pages/home";

export const HomePage = () => {
  return (
    <Container>
      <NewGameButton/>
    </Container>
  );
}
import { Image, View } from "react-native";
import styled from "styled-components/native";
import {
	almostDead,
	damage30,
	damage50,
	damage60,
	damage75,
	damage75_2,
	firstBlood,
} from "./images";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const DamageImage: typeof Image = styled(Image).attrs({
	resizeMode: "contain",
})`
  position: absolute;
`;

export const FirstBlood: typeof DamageImage = styled(DamageImage).attrs({
	source: firstBlood,
})`
  width: 80px;
  height: 100px;
  top: 25%;
  left: 10%;
  opacity: 0.5;
`;

export const Damage30: typeof DamageImage = styled(DamageImage).attrs({
	source: damage30,
})`
  width: 120px;
  height: 120px;
  top: 45%;
  right: 15%;

  opacity: 0.6;
`;

export const Damage50: typeof DamageImage = styled(DamageImage).attrs({
	source: damage50,
})`
  width: 200px;
  height: 300px;
  top: 60%;
  left: 5%;

  opacity: 0.8;
`;

export const Damage60: typeof DamageImage = styled(DamageImage).attrs({
	source: damage60,
})`
  width: 100px;
  height: 100px;
  bottom: 10%;
  right: 5%;

  opacity: 0.7;
`;

export const Damage75: typeof DamageImage = styled(DamageImage).attrs({
	source: damage75,
})`
  width: 150px;
  height: 150px;
  bottom: 0%;
  left: 0%;

  opacity: 0.7;
`;

export const Damage75_2: typeof DamageImage = styled(DamageImage).attrs({
	source: damage75_2,
})`
  width: 350px;
  height: 350px;
  top: 2%;
  right: -30%;

  opacity: 0.7;
`;

export const AlmostDead: typeof DamageImage = styled(DamageImage).attrs({
	source: almostDead,
})`
  width: 200px;
  height: 300px;
  top: 0%;
  left: 0%;
`;

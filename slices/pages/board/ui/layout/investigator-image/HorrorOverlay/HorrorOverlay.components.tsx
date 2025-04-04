import { Image, View } from "react-native";
import styled from "styled-components/native";

import { color } from "@shared/config";
import {
	almostInsane,
	area,
	eye,
	fog,
	rr1,
	scratches,
	writing,
} from "./images";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const HorrorImage: typeof Image = styled(Image).attrs({
	resizeMode: "contain",
})`
  position: absolute;
`;

export const Writing: typeof HorrorImage = styled(HorrorImage).attrs({
	source: writing,
	resizeMode: "cover",
})`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.3;
`;

export const RR1: typeof HorrorImage = styled(HorrorImage).attrs({
	source: rr1,
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;

  opacity: 0.1;
`;

export const Scratches: typeof HorrorImage = styled(HorrorImage).attrs({
	source: scratches,
	resizeMode: "cover",
	tintColor: color.sanity,
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;

  opacity: 0.2;
`;

export const Fog: typeof HorrorImage = styled(HorrorImage).attrs({
	source: fog,
	resizeMode: "cover",
	tintColor: color.sanity,
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;

  opacity: 0.9;
`;

export const AreaTop: typeof HorrorImage = styled(HorrorImage).attrs({
	source: area,
})`
  left: -5%;
  top: -15%;
  width: 50%;
  height: 50%;
  opacity: 0.6;
`;

export const AreaBottom: typeof HorrorImage = styled(HorrorImage).attrs({
	source: area,
})`
  right: -15%;
  bottom: -10%;
  width: 50%;
  height: 50%;
  opacity: 0.6;
`;

export const Eye: typeof HorrorImage = styled(HorrorImage).attrs({
	source: eye,
	resizeMode: "cover",
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;
  opacity: 0.2;
`;

export const AlmostInsane: typeof HorrorImage = styled(HorrorImage).attrs({
	source: almostInsane,
	resizeMode: "cover",
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;
  opacity: 0.3;
`;

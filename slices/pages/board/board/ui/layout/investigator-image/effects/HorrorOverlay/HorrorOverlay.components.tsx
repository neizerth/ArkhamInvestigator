import { Image, View } from "react-native";
import styled from "styled-components/native";

import { horrorImages } from "@assets/images/game/effects/horror";
import { color } from "@shared/config";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const HorrorImage: typeof Image = styled(Image).attrs({
	resizeMode: "contain",
})`
  position: absolute;
`;

export const Writing: typeof HorrorImage = styled(HorrorImage).attrs({
	source: horrorImages.writing,
	resizeMode: "cover",
})`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.3;
`;

export const RR1: typeof HorrorImage = styled(HorrorImage).attrs({
	source: horrorImages.rorschach,
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;

  opacity: 0.1;
`;

export const Scratches: typeof HorrorImage = styled(HorrorImage).attrs({
	source: horrorImages.scratches,
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
	source: horrorImages.fog,
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
	source: horrorImages.area,
})`
  left: -5%;
  top: -15%;
  width: 50%;
  height: 50%;
  opacity: 0.6;
`;

export const AreaBottom: typeof HorrorImage = styled(HorrorImage).attrs({
	source: horrorImages.area,
})`
  right: -15%;
  bottom: -10%;
  width: 50%;
  height: 50%;
  opacity: 0.6;
`;

export const Eye: typeof HorrorImage = styled(HorrorImage).attrs({
	source: horrorImages.eye,
	resizeMode: "cover",
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;
  opacity: 0.2;
`;

export const AlmostInsane: typeof HorrorImage = styled(HorrorImage).attrs({
	source: horrorImages.almostInsane,
	resizeMode: "cover",
})`
  width: 100%;
  height:100%;
  top: 0;
  left: 0;
  opacity: 0.3;
`;

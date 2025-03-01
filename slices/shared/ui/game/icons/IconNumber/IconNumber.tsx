import React from "react";
import { StrokedIconNumber } from "./StrokedIconNumber";
import { UnstrokedIconNumber } from "./UnstrokedIconNumber";
import type { IconNumberProps } from "./IconNumber.types";

export type { IconNumberProps };

export const IconNumber = (props: IconNumberProps) => {
  const { stroke } = props;

  const Component = stroke ? 
    StrokedIconNumber : 
    UnstrokedIconNumber;

  return (
    <Component {...props}/>
  )
}




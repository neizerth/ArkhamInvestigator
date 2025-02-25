import type { Box, Orientation } from "@shared/model";

export const getOrientation = ({ 
  width, 
  height 
}: Box): Orientation => width > height ? 'landscape' : 'portrait';
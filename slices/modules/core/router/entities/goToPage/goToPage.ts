import { createAction } from "@reduxjs/toolkit";
import type { Href } from "expo-router";

export const goToPage = createAction<Href>("router/goToPage");

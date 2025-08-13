import { createAction } from "@reduxjs/toolkit";
import type { Href } from "expo-router";

export const replacePageTo = createAction<Href>("router/replacePageTo");

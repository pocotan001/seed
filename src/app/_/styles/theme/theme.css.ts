import { createGlobalTheme, createVar } from "@vanilla-extract/css";
import * as tokens from "./tokens";

export type CSSVarFunction = ReturnType<typeof createVar>;
export const vars = createGlobalTheme(":root", tokens);

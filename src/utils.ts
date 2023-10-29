// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindConfig from "../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

// Resolve Tailwind theme.
export const theme = resolveConfig(tailwindConfig).theme;

export function isScreenSize(size: string) {
  return window.matchMedia(`(min-width: ${theme.screens[size]})`).matches;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindConfig from "../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

// Resolve Tailwind theme.
export const theme = resolveConfig(tailwindConfig).theme;

export function isScreenSize(size: string) {
  return window.matchMedia(`(min-width: ${theme.screens[size]})`).matches;
}

// Browser Detector
(function () {
  const addClass = document.body.classList.add.bind(document.body.classList);

  // detect mobile platform
  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    addClass("ios-device");
  }

  if (navigator.userAgent.match(/Android/i)) {
    addClass("android-device");
  }

  // detect desktop platform
  if (navigator.appVersion.indexOf("Win") !== -1) {
    addClass("win-os");
  }

  if (navigator.appVersion.indexOf("Mac") !== -1) {
    addClass("mac-os");
  }

  // detect browser
  if (navigator.userAgent.indexOf("Firefox") !== -1) {
    addClass("firefox");
  }

  if (navigator.userAgent.indexOf("Chrome") !== -1) {
    addClass("chrome");
  }

  if (navigator.userAgent.indexOf("Safari") !== -1) {
    addClass("safari");
  }
})();

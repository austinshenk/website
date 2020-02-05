import {Elm} from "Main";

const preferences = {
  colorScheme: "no-preference",
  reducedMotion: "no-preference",
  textSize: 100
};

const supports = {
  variables: false
};

document.addEventListener("DOMContentLoaded", () => {
  if (window.CSS) {
    if (CSS.supports('--t:0')) {
      supports.variables = true;
    }
  }

  if (window.matchMedia) {

    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
    if (window.matchMedia("@media (prefers-color-scheme: dark)").matches) {
      preferences.colorScheme = "dark"
    } else if (window.matchMedia("@media (prefers-color-scheme: light)").matches) {
      preferences.colorScheme = "light"
    } else {
      preferences.colorScheme = "no-preference";
    }

    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
    if (window.matchMedia("@media (prefers-reduced-motion: reduce)").matches) {
      preferences.reducedMotion = "reduce"
    } else {
      preferences.reducedMotion = "no-preference";
    }
  }

  Elm.Main.init(document.body, {preferences, supports});
});
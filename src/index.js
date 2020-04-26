import {Elm} from "Main";

const preferences = {
  colorScheme: "no-preference",
  reducedMotion: "no-preference",
  textSize: "100"
};

let sendPreferencesToElmApp;
const mediaListener = (mediaQuery, setter) => {
  const mediaQueryList = window.matchMedia(mediaQuery);

  mediaQueryList.addListener((mediaQueryEvent) => {
    if (mediaQueryEvent.matches) {
      setter();
      sendPreferencesToElmApp();
    }
  })

  if (mediaQueryList.matches)
    setter();

  return mediaQueryList.matches;
};

document.addEventListener("DOMContentLoaded", () => {

  if (window.matchMedia) {

    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
    const prefersDarkMode = mediaListener("@media (prefers-color-scheme: dark)", () => preferences.colorScheme = "dark");
    const prefersLightMode = mediaListener("@media (prefers-color-scheme: light)", () => preferences.colorScheme = "light");
    if (!prefersDarkMode && !prefersLightMode)
      preferences.colorScheme = "no-preference";

    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
    const prefersReducedMotion = mediaListener("@media (prefers-reduced-motion: reduce)", () => preferences.reducedMotion = "reduce");
    if (!prefersReducedMotion)
      preferences.reducedMotion = "no-preference";
  }

  const app = Elm.Main.init(document.body, preferences);

  app.ports.sendMessage.subscribe((message) => {
    const htmlRoot = document.firstElementChild;

    if (message.textSize !== undefined && message.textSize !== null) {
      htmlRoot.style.fontSize = (message.textSize / 100 * .2) + "in";
    }

    if (message.colorScheme !== undefined && message.colorScheme !== null) {
      htmlRoot.classList.toggle("prefers-dark-mode", message.colorScheme === "dark");
    }
  });
  sendPreferencesToElmApp = () => app.ports.messageReceiver.send(preferences);
});
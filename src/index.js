import {Elm} from "./Main.elm";

let initialPreferences = {};
const getPreferencesFromLocalStorage = function() {
  try {
    initialPreferences = JSON.parse(localStorage.getItem("preferences"));
  } catch (e) {
    console.warn("Failed to load preferences from local storage. Falling back to defaults");
  }
}();
const createMediaListeners = function() {
  if (window.matchMedia) {
    const mediaListener = (mediaQuery, onMatch) => {
      const mediaQueryList = window.matchMedia(mediaQuery);

      mediaQueryList.addListener((mediaQueryEvent) => {
        if (mediaQueryEvent.matches)
          onMatch();
      })

      return mediaQueryList.matches;
    };

    const updateSystemColorScheme = (systemValue) => () => {
      sendMessageToElmApp({
        key: "UpdateSystemColorScheme",
        value: systemValue
      });
    }

    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
    if (mediaListener("(prefers-color-scheme: dark)", updateSystemColorScheme("dark")))
      initialPreferences.colorScheme.systemValue = "dark";
    if (mediaListener("(prefers-color-scheme: light)", updateSystemColorScheme("light")))
      initialPreferences.colorScheme.systemValue = "light";


    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
    if (mediaListener("(prefers-reduced-motion: reduce)", () => sendMessageToElmApp({
      key: "UpdateSystemReduceMotion",
      value: "reduce"
    })))
      initialPreferences.reducedMotion.systemValue = "reduce";
  }
}
const app = Elm.Main.init({node: document.body, flags: initialPreferences});

const sendMessageToElmApp = app.ports.incomingMessage.send;

const outgoingMessageMap = {
  "StorePreferences": (preferencesFromElm) => {
    const applyColorScheme = function() {
      const {override, appValue, systemValue} = preferencesFromElm.colorScheme;
      document.firstElementChild.classList.toggle("prefers-dark-mode", override ? appValue === "dark" : systemValue === "dark");
    }();

    const applyTextSize = function() {
      const textSize = preferencesFromElm.textSize;
      document.firstElementChild.style.fontSize = (textSize / 100 * .2) + "in";
    }();

    localStorage.setItem("preferences", JSON.stringify(preferencesFromElm));
  }
};
app.ports.outgoingMessage.subscribe((message) => outgoingMessageMap[message.key](message.value));

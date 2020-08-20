// @ts-ignore
import {Elm} from "./Main.elm";

const localStorageKey: string = "preferences";
class Preferences {
  colorScheme : SystemPreference<string> = new SystemPreference<string>();
  reducedMotion : SystemPreference<string> = new SystemPreference<string>();
  textSize : number = 100
}
class SystemPreference<T> {
  override : boolean = false;
  systemValue : T
  appValue : T
}

let initialPreferences: Preferences = new Preferences();
const getPreferencesFromLocalStorage = function() {
  const localPreferences = localStorage.getItem(localStorageKey);

  if (!localPreferences)
    return;

  try {
    initialPreferences = JSON.parse(localPreferences);
  } catch (e) {
    console.warn("Failed to load preferences from local storage. Falling back to defaults");
  }
}();
const createMediaListeners = function() {
  if (window.matchMedia) {
    const mediaListener = (mediaQuery: string, onMatch: () => void) => {
      const mediaQueryList: MediaQueryList = window.matchMedia(mediaQuery);

      mediaQueryList.addListener((mediaQueryEvent) => {
        if (mediaQueryEvent.matches)
          onMatch();
      })

      return mediaQueryList.matches;
    };

    const updateSystemColorScheme = (systemValue: string) => () => {
      sendMessageToElmApp({
        key: "UpdateSystemColorScheme",
        value: systemValue
      });
    }

    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
    const prefersDarkColorScheme = mediaListener("(prefers-color-scheme: dark)", updateSystemColorScheme("dark"));
    if (prefersDarkColorScheme)
      initialPreferences.colorScheme.systemValue = "dark";

    const prefersLightColorScheme = mediaListener("(prefers-color-scheme: light)", updateSystemColorScheme("light"));
    if (prefersLightColorScheme)
      initialPreferences.colorScheme.systemValue = "light";


    //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
    const prefersReducedMotion = mediaListener("(prefers-reduced-motion: reduce)", () => sendMessageToElmApp({
      key: "UpdateSystemReduceMotion",
      value: "reduce"
    }));
    if (prefersReducedMotion)
      initialPreferences.reducedMotion.systemValue = "reduce";
  }
}();
const app = Elm.Main.init({node: document.body, flags: initialPreferences});

interface IncomingMessage<T> {
  key: string,
  value: T
}
const sendMessageToElmApp: (message: IncomingMessage<any>) => void = app.ports.incomingMessage.send;

interface OutgoingMessage<T> {
  key: string,
  value: T
}
interface OutgoingMessageMap {
  [key: string] : (value: any) => void
}
const outgoingMessageMap: OutgoingMessageMap = {
  "StorePreferences": (preferencesFromElm : Preferences) => {
    const {override, appValue, systemValue} = preferencesFromElm.colorScheme;
    document.firstElementChild.classList.toggle("prefers-dark-mode", (override ? appValue : systemValue) === "dark");

    const textSize = preferencesFromElm.textSize;
    document.firstElementChild["style"].fontSize = (textSize * .002) + "in";

    localStorage.setItem(localStorageKey, JSON.stringify(preferencesFromElm));
  }
};
app.ports.outgoingMessage.subscribe((message: OutgoingMessage<any>) => {
  outgoingMessageMap[message.key](message.value)
});

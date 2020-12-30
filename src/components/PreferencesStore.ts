import {useEffect, useRef} from "react";

const KEY: string = "preferences";
class Preferences {
    colorScheme : SystemPreference = new SystemPreference();
    reducedMotion : SystemPreference = new SystemPreference();
    textSize : number = 100
}
class SystemPreference {
    systemValue : string = "";
    appValue : string = "";
}

const getStoredPreferences = () => {
    return localStorage.getItem(KEY);
};

const setStoredPreferences = (preferencesString: string) => {
    return localStorage.setItem(KEY, preferencesString);
};

const getPreferences = (): Preferences => {
    return stringToPreferences(getStoredPreferences());
};

const setPreferences = (preferences: Preferences) => {
    setStoredPreferences(preferencsToString(preferences));
}

const preferencsToString = (preferences: Preferences): string => {
    if (!preferences)
        return JSON.stringify(new Preferences());

    try {
        return JSON.stringify(preferences);
    } catch (e) {
        console.warn("Failed to store preferences to local storage. Falling back to defaults");
    }
}

const stringToPreferences = (preferencesString: string): Preferences => {
    if (!preferencesString)
        return new Preferences();

    try {
        return JSON.parse(preferencesString);
    } catch (e) {
        console.warn("Failed to load preferences from local storage. Falling back to defaults");
    }
}

const createMediaListeners = (preferences: Preferences) => {
    if (window.matchMedia) {
        const mediaListener = (mediaQuery: string, onMatch: () => void) => {
            const mediaQueryList: MediaQueryList = window.matchMedia(mediaQuery);
            const listener = (mediaQueryEvent: MediaQueryListEvent) => {
                if (mediaQueryEvent.matches)
                    onMatch();
            };

            mediaQueryList.addListener(listener);

            return mediaQueryList.matches;
        };

        //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
        const prefersDarkColorScheme = mediaListener("(prefers-color-scheme: dark)", () => setColorSchemeSystemValue(preferences)("dark"));
        if (prefersDarkColorScheme)
            preferences.colorScheme.systemValue = "dark";

        const prefersLightColorScheme = mediaListener("(prefers-color-scheme: light)", () => setColorSchemeSystemValue(preferences)("light"));
        if (prefersLightColorScheme)
            preferences.colorScheme.systemValue = "light";


        //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
        const prefersReducedMotion = mediaListener("(prefers-reduced-motion: reduce)", () => setReducedMotionSystemValue(preferences)("reduce"));
        if (prefersReducedMotion)
            preferences.reducedMotion.systemValue = "reduce";
    }
};

const applyPreferences = ({textSize, colorScheme, reducedMotion}: Preferences) => {
    applyTextSize(textSize);
    applyColorScheme(colorScheme);
    applyReducedMotion(reducedMotion);
};

const setTextSize = (preferences: Preferences) => (textSize: number) => {
    if (preferences.textSize === textSize)
        return;

    preferences.textSize = textSize;
    applyTextSize(textSize);
    setPreferences(preferences);
}

const applyTextSize = (textSize: number) => {
    document.firstElementChild["style"].fontSize = (textSize * .002) + "in";
}

const setColorSchemeSystemValue = (preferences: Preferences) => (systemValue: string) => {
    setSystemPreferenceSystemValue(preferences.colorScheme, systemValue, applyColorScheme);
    setPreferences(preferences);
};

const setColorSchemeAppValue = (preferences: Preferences) => (appValue: string) => {
    setSystemPreferenceAppValue(preferences.colorScheme, appValue, applyColorScheme);
    setPreferences(preferences);
};

const applyColorScheme = (colorScheme: SystemPreference) => {
    applySystemPreference(colorScheme, "prefers-color-scheme");
};

const setReducedMotionSystemValue = (preferences: Preferences) => (systemValue: string) => {
    setSystemPreferenceSystemValue(preferences.reducedMotion, systemValue, applyReducedMotion);
    setPreferences(preferences);
};

const setReducedMotionAppValue = (preferences: Preferences) => (appValue: string) => {
    setSystemPreferenceAppValue(preferences.reducedMotion, appValue, applyReducedMotion);
    setPreferences(preferences);
};

const applyReducedMotion = (reducedMotion: SystemPreference) => {
    applySystemPreference(reducedMotion, "prefers-reduced-motion");
};

const setSystemPreferenceSystemValue = (systemPreference: SystemPreference, systemValue: string, applySystemPreference: (p: SystemPreference) => void) => {
    systemPreference.systemValue = systemValue;
    applySystemPreference(systemPreference);
}

const setSystemPreferenceAppValue = (systemPreference: SystemPreference, appValue: string, applySystemPreference: (p: SystemPreference) => void) => {
    systemPreference.appValue = appValue;
    applySystemPreference(systemPreference);
}

const applySystemPreference = (systemPreference: SystemPreference, attribute: string) => {
    const {appValue, systemValue} = systemPreference;
    document.firstElementChild.setAttribute(attribute, appValue !== "" ? appValue : systemValue);
};

type UsePreferences = [
    Preferences,
    {
        setTextSize: (textSize: number) => void,
        setColorScheme: (value: string) => void,
        setReducedMotion: (value: string) => void
    }
]

export default function usePreferences(): UsePreferences {
    const preferencesRef = useRef<Preferences>(getPreferences());
    const preferences = preferencesRef.current;
    useEffect(() => {
        createMediaListeners(preferences);
        applyPreferences(preferences);
    }, []);

    return [preferences, {
        setTextSize: setTextSize(preferences),
        setColorScheme: setColorSchemeAppValue(preferences),
        setReducedMotion: setReducedMotionAppValue(preferences)
    }];
}
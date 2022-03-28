import React from "react";

export interface Theme {
    spacing: (amount?: number) => string;
    timing: {
        instant: string;
        fast: string;
        average: string;
        slow: string;
    };
    typography: {
        smallest: string;
        default: string;
        large: string;
        largest: string;
    }
}

const themeDefaults: Theme = {
    spacing: (amount) => `${4 * (amount ?? 1)}px`,
    timing: {
        instant: "0.01s",
        fast: "0.1s",
        average: "0.2s",
        slow: "0.5s"
    },
    typography: {
        smallest: ".5rem",
        default: "1rem",
        large: "1.5rem",
        largest: "2rem",
    }
}

export const ThemeGenerator = (configuration?: Partial<Theme>): Theme => {
    return {
        ...themeDefaults,
        ...configuration
    } as Theme
}

const ThemeContext = React.createContext<Theme>(ThemeGenerator({spacing: () => ""}));

type Props = React.PropsWithChildren<{
    theme: Theme
}>;

export const ThemeProvider = (props: Props) => {
    return <ThemeContext.Provider value={props.theme}>
        {props.children}
    </ThemeContext.Provider>
};

export const useTheme = () => React.useContext(ThemeContext);
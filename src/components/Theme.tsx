import React from "react";

export interface Theme {
    spacing: (amount?: number) => string
}

const ThemeContext = React.createContext<Theme>({
    spacing: () => ""
});

type Props = React.PropsWithChildren<{
    theme: Theme
}>;

export const ThemeProvider = (props: Props) => {
    return <ThemeContext.Provider value={props.theme}>
        {props.children}
    </ThemeContext.Provider>
};

const useTheme = () => React.useContext(ThemeContext);
export default useTheme;
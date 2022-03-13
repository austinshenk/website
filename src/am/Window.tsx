import React, {ForwardedRef} from "react";
import css from "styled-jsx/css";
import {useTheme, Theme} from "./Theme";

type Config = Partial<{
    active: boolean;
    fullscreen: boolean;
}>;

function styles(theme: Theme) {return css.global`
    [am-window] {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden auto;
        
        padding: ${theme.spacing()};
    }
    
    [am-window][am-window-fullscreen] {
        padding: 0;
        overflow: initial;
    }
    
    [am-window="inactive"] {
        pointer-events: none;
    }`
}

function window({active, fullscreen, ...rest}: Config) {return {
    "am-window" : active ? "active" : "inactive",
    "am-window-fullscreen": fullscreen?.toString(),
    ...rest
}}

type HtmlSectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type Props = React.PropsWithChildren<HtmlSectionProps> & Config;

function Window(props: Props, ref: ForwardedRef<HTMLElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <section {...window(props)} ref={ref} />
    </>;
}

export const Component = React.forwardRef<HTMLElement, Props>(Window);
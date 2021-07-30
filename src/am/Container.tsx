import React from "react";
import {css} from "styled-jsx/css";
import {useTheme, Theme} from "./Theme";

type Config = Partial<{
    as: React.ElementType;
    variation: "container" | "container-alternative" | "anchor" | "button" | "control";
}>;

function styles(theme: Theme) { return css.global`
[am-container] {
    background: none;
    margin: ${theme.spacing()};
    border: ${theme.spacing()} solid transparent;
    border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAI0lEQVQI12NgYGBgiDd1/h9v6vyfgYGBgRHGgAEmBmwAWQsATrIJMg0Be5wAAAAASUVORK5CYII=) 25%;
}

[prefers-color-scheme=dark] [am-container] {
    border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQI12NgYGBgePvt6v+3367+Z2BgYGCEMWCAiQEbQNYCAK4IEpd2RVnsAAAAAElFTkSuQmCC) 25%;
}

[am-container=floating] > section {
    box-shadow: 0 ${theme.spacing(2)} 0 var(--shadow), ${theme.spacing()} ${theme.spacing()} var(--shadow), -${theme.spacing()} ${theme.spacing()} var(--shadow);
}

[am-container] > section {
    padding: ${theme.spacing()};
    background-color: var(--background);
}

[am-container][am-container-background="alternative"] > section {
    background-color: var(--background-main);
}

[am-container][am-container-interactive] {
    transition: transform .1s ease-in-out;
}

[am-container][am-container-interactive] > section {
    transition: box-shadow .1s ease-in-out, background .3s ease-in-out, color .3s ease-in-out, text-shadow .3s ease-in-out;
}

[am-container][am-container-interactive]:hover > section,
[am-container][am-container-interactive]:focus > section,
[am-container][am-container-interactive]:focus-within > section {
    background-color: hsl(0, 0%, 50%);
    color: hsl(0, 0%, 100%);
    outline: none;
}

[am-container][am-container-interactive]:hover [am-icon][am-icon-style=outline] path,
[am-container][am-container-interactive]:focus [am-icon][am-icon-style=outline] path,
[am-container][am-container-interactive]:focus-within [am-icon][am-icon-style=outline] path {
    stroke: hsl(0, 0%, 100%);
}

[am-container][am-container-interactive]:hover [am-icon][am-icon-style=fill] path,
[am-container][am-container-interactive]:focus [am-icon][am-icon-style=fill] path,
[am-container][am-container-interactive]:focus-within [am-icon][am-icon-style=fill] path {
    fill: hsl(0, 0%, 100%);
}

[am-container][am-container-interactive]:hover [am-icon][am-icon-style=outline-fill] path,
[am-container][am-container-interactive]:focus [am-icon][am-icon-style=outline-fill] path,
[am-container][am-container-interactive]:focus-within [am-icon][am-icon-style=outline-fill] path {
    fill: hsl(0, 0%, 100%);
    stroke: hsl(0, 0%, 100%);
}

[am-container][am-container-interactive]:not([disabled=""]):active, [am-container][am-container-interactive]:not([disabled=true]):active {
    transform: translate(0, 2px);
}
`;}

const container = ({variation, ...containerProps}: Props) => {
    switch(variation) {
        default:
        case "container":
            return {
                "am-container" : "",
                ...containerProps
            }
        case "container-alternative":
            return {
                "am-container" : "",
                "am-container-background": "alternative",
                ...containerProps
            }
        case "control":
            return {
                "am-container" : "",
                "am-container-background": "alternative",
                "am-container-interactive": "",
                ...containerProps
            }
        case "button":
            return {
                "am-container" : "floating",
                "am-container-background": "alternative",
                "am-container-interactive": "",
                ...containerProps
            }
        case "anchor":
            return {
                "am-container" : "",
                "am-container-background": "alternative",
                "am-container-interactive": "",
                ...containerProps
            }
    }
};

type HtmlSectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
type HtmlElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type Props = React.PropsWithChildren<HtmlElementProps> & Config & {
    containerBodyProps?: BodyProps;
};

export type BodyProps = HtmlSectionProps & {[key: string]: any};

function Container(props: Props, ref: React.ForwardedRef<HTMLElement>) {
    const theme = useTheme();
    const style = styles(theme);
    const {as: As, variation, containerBodyProps, children, ...containerProps} = props;
    const Component = As ?? "section";

    return <>
        <style jsx global>{style}</style>
        <Component {...container({variation, ...containerProps})} ref={ref}>
            <section {...containerBodyProps}>{children}</section>
        </Component>
    </>;
}

export const Component = React.forwardRef<HTMLElement, Props>(Container);
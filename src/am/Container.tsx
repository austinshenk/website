import React from "react";
import {useTheme, Theme} from "./Theme";

type Config = Partial<{
    as: React.ElementType;
    variation: Variation;
}>;

type Variation = "container" | "container-alternative" | "anchor" | "button" | "control";

const styles = (theme: Theme) => <style jsx global>{`
[am-container] {
    background-clip: padding-box;
    margin: ${theme.spacing()};
    border: ${theme.spacing()} solid transparent;
    border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAI0lEQVQI12NgYGBgiDd1/h9v6vyfgYGBgRHGgAEmBmwAWQsATrIJMg0Be5wAAAAASUVORK5CYII=) 25%;
}

[prefers-color-scheme=dark] [am-container] {
    border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQI12NgYGBgePvt6v+3367+Z2BgYGCEMWCAiQEbQNYCAK4IEpd2RVnsAAAAAElFTkSuQmCC) 25%;
}

[am-container=floating] {
    box-shadow: 0 ${theme.spacing(2)} 0 ${theme.spacing(-1)} var(--shadow);
}

[am-container=floating][am-container-interactive]:not([disabled=""]):active, [am-container=floating][am-container-interactive]:not([disabled=true]):active {
    box-shadow: 0 ${theme.spacing(1.5)} 0 ${theme.spacing(-1)} var(--shadow);
}

[am-container] {
    padding: ${theme.spacing()};
    background-color: var(--background);
}

[am-container][am-container-background="alternative"] {
    background-color: var(--background-main);
}

[am-container][am-container-interactive] {
    transition: transform .1s ease-in-out;
}

[am-container][am-container-interactive] {
    transition: box-shadow .1s ease-in-out, background .3s ease-in-out, color .3s ease-in-out, text-shadow .3s ease-in-out;
}

[am-container][am-container-interactive]:hover,
[am-container][am-container-interactive]:focus,
[am-container][am-container-interactive]:focus-within {
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
`}</style>;

const container = (variation?: Variation) => {
    switch(variation) {
        default:
        case "container":
            return {
                "am-container" : ""
            }
        case "container-alternative":
            return {
                "am-container" : "",
                "am-container-background": "alternative"
            }
        case "control":
            return {
                "am-container" : "",
                "am-container-background": "alternative",
                "am-container-interactive": ""
            }
        case "button":
            return {
                "am-container" : "floating",
                "am-container-background": "alternative",
                "am-container-interactive": ""
            }
        case "anchor":
            return {
                "am-container" : "",
                "am-container-background": "alternative",
                "am-container-interactive": ""
            }
    }
};

type HtmlElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type Props = React.PropsWithChildren<HtmlElementProps> & Config;

function Container(props: Props, ref: React.ForwardedRef<HTMLElement>) {
    const theme = useTheme();
    const {as: As, variation, children, ...containerProps} = props;
    const Component = As ?? "section";

    return <>
        {styles(theme)}
        <Component {...container(variation)} {...containerProps} ref={ref}>
            {children}
        </Component>
    </>;
}

export const Component = React.forwardRef<HTMLElement, Props>(Container);
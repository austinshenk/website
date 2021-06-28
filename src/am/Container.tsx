import React from "react";
import {css} from "styled-jsx/css";
import {useTheme, Theme} from "./Theme";

type Config = Partial<{
    as: React.ElementType;
    floating: boolean;
    background: "alternative";
}>;

function styles(theme: Theme) {
    return css.global`
    [am-container] {
        margin: ${theme.spacing()};
        padding: ${theme.spacing()};
        background-color: var(--background);
    }
    
    [am-container=""] {${pixelatedBorder(theme)}}
    
    [am-container=floating] {${pixelatedBorder(theme, true)}}
    
    [am-container][am-container-background="alternative"] {
        background-color: var(--background-main);
    }
`;
}

const pixelatedBorder = (theme: Theme, floating?: boolean, interactive?: boolean, state?: "normal") => {
    const color = "var(--pixel)";
    const shadow = "var(--shadow)";
    let border = `0 -${theme.spacing()} ${color}, ${theme.spacing()} 0 ${color}, 0 ${theme.spacing()} ${color}, -${theme.spacing()} 0 ${color}`;

    if ((floating && !interactive) || (floating && interactive && state === "normal"))
        border = `${border}, 0 ${theme.spacing(2)} ${shadow}, ${theme.spacing()} ${theme.spacing()} ${shadow}, -${theme.spacing()} ${theme.spacing()} ${shadow}`;

    return `box-shadow: ${border}`
};

const container = ({floating, background, ...props}: Config) => ({
    "am-container" : floating ? "floating" : "",
    "am-container-background" : background,
    ...props
});

type HtmlSectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type Props = React.PropsWithChildren<HtmlSectionProps> & Config;

function Container(props: Props, ref: React.ForwardedRef<HTMLElement>) {
    const theme = useTheme();
    const style = styles(theme);
    const {as: As, ...containerProps} = props;
    const Component = As ?? "section";

    return <>
        <style jsx global>{style}</style>
        <Component {...container(containerProps)} ref={ref}/>
    </>;
}

export const Component = React.forwardRef<HTMLElement, Props>(Container);
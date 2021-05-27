import {css} from "styled-jsx/css";
import {Theme} from "components/Theme";

export type ContainerProps = Partial<{
    variation: "floating" | "invisible";
    background: "alternative";
}>;

export function containerStyles(theme: Theme) {
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

export const container = ({variation, background, ...rest}: ContainerProps) => ({
    "am-container" : variation ?? "",
    "am-container-background" : background,
    ...rest
});
import {css} from "styled-jsx/css";
import {Theme} from "components/Theme";

export type WindowProps = Partial<{
    active: boolean;
    fullscreen: boolean;
}>;

export function windowStyles(theme: Theme) {return css.global`
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

export function window({active, fullscreen, ...rest}: WindowProps) {return {
    "am-window" : active ? "active" : "inactive",
    "am-window-fullscreen": fullscreen?.toString(),
    ...rest
}}
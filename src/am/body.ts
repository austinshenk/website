import {css} from "styled-jsx/css";

export interface BodyProps {
    state: BodyState
}

export enum BodyState {
    UNLOADED = "unloaded",
    LOADING = "loading",
    LOADED = "loaded"
}

export const bodyGlobalStyles = `
    body {
        background: #808080;
    }
    [am-body] {
        opacity: 0;
    }
`;

export const bodyStyles = css.global`
    [am-body] {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        
        color: var(--text);
        background: var(--background-body);
    }
    
    [am-body="unloaded"] *, [am-body="loading"] * {
        transition: none !important;
    }
    
    [am-body="loading"], [am-body="loaded"] {
        opacity: 1;
    }   
`;

export const body = ({state, ...rest}: BodyProps) => ({
    "am-body" : state,
    ...rest
});
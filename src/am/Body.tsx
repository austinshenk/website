import React from "react";
import Head from "next/head";
import css from "styled-jsx/css";

interface Config {
    state: State
}

export enum State {
    UNLOADED = "unloaded",
    LOADING = "loading",
    LOADED = "loaded"
}

const globalStyle = `
    body {
        background: #808080;
        transition: background .1s ease-in-out;
    }
    html[prefers-color-scheme] body {
        background: var(--background-main);
    }
    [am-body] {
        opacity: 0;
    }
`;

const style = css.global`
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

const body = ({state, ...rest}: Config) => ({
    "am-body" : state,
    ...rest
});

type HtmlSectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type Props = React.PropsWithChildren<HtmlSectionProps> & Config;

function Body(props: Props, ref: React.ForwardedRef<HTMLElement>) {
    return <>
        <Head>
            <style>{globalStyle}</style>
        </Head>
        <style jsx global>{style}</style>
        <section {...body(props)} ref={ref} />
    </>;
}

export const Component = React.forwardRef<HTMLElement, Props>(Body);
import React from "react";
import {css} from "styled-jsx/css";
import {useTheme, Theme} from "./Theme";

function styles(theme: Theme) {return css.global`
h1, h2, h3, h4, h5, h6, span[role="heading"] {
    font-family: system-san-serif;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

h1, span[role="heading"][aria-level="1"] {
    font-size: 1.5rem;
    box-shadow: -${theme.spacing(1.5)} 0 var(--pixel);
    margin-left: ${theme.spacing(1.5)};
    padding-left: ${theme.spacing(1.5)};
}

h1 > a, h1 > a:active, span[role="heading"][aria-level="1"] > a, span[role="heading"][aria-level="1"] > a:active {
    margin: 0 !important;
    box-shadow: 0 ${theme.spacing(1.5)} var(--pixel) !important;
}

h2, span[role="heading"][aria-level="2"] {
    font-size: 1.25rem;
    box-shadow: -${theme.spacing()} 0 var(--pixel);
    margin-left: ${theme.spacing()};
    padding-left: ${theme.spacing()};
}

h2 > a, h2 > a:active, span[role="heading"][aria-level="2"] > a, span[role="heading"][aria-level="2"] > a:active {
    margin: 0 !important;
    box-shadow: 0 ${theme.spacing()} var(--pixel) !important;
}

h3, span[role="heading"][aria-level="3"] {
    box-shadow: -${theme.spacing(0.5)} 0 var(--pixel);
    margin-left: ${theme.spacing(0.5)};
    padding-left: ${theme.spacing(0.5)};
}

h3 > a, h3 > a:active, span[role="heading"][aria-level="3"] > a, span[role="heading"][aria-level="3"] > a:active {
    margin: 0 !important;
    box-shadow: 0 ${theme.spacing(0.5)} var(--pixel) !important;
}

h4 > a, h4 > a:active, h5 > a, h5 > a:active, h6 > a, h6 > a:active, span[role="heading"] > a, span[role="heading"] > a:active {
    margin: 0 !important;
    box-shadow: 0 ${theme.spacing(0.5)} var(--pixel) !important;
}
`}

type HtmlHeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export type Props = React.PropsWithChildren<HtmlHeadingProps>;

export const H1 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <h1 {...props} ref={ref} />
    </>;
});

export const H2 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <h2 {...props} ref={ref} />
    </>;
});

export const H3 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <h3 {...props} ref={ref} />
    </>;
});

export const H4 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <h4 {...props} ref={ref} />
    </>;
});

export const H5 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <h5 {...props} ref={ref} />
    </>;
});

export const H6 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <h6 {...props} ref={ref} />
    </>;
});

type ImposterProps = Props & Partial<{
    level: number
}>;

export const Imposter = React.forwardRef<HTMLSpanElement, ImposterProps>(function(props: ImposterProps, ref: React.ForwardedRef<HTMLSpanElement>) {
    const {level, ...spanProps} = props;
    const theme = useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <span role="heading" aria-level={level} {...spanProps} ref={ref} />
    </>;
});
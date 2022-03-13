import React from "react";
import {useTheme, Theme} from "./Theme";

const styles = (theme: Theme) => <style jsx global>{`
h1, h2, h3, h4, h5, h6, span[role="heading"] {
    font-family: system-san-serif;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

h1 > a, h2 > a, h3 > a, h4 > a, h5 > a, h6 > a, span[role="heading"] > a {
    margin: 0 !important;
}

h1, span[role="heading"][aria-level="1"] {
    font-size: 1.5rem;
    border-left: ${theme.spacing(1.5)} solid var(--pixel);
    padding-left: ${theme.spacing(1.5)};
}

h2, span[role="heading"][aria-level="2"] {
    font-size: 1.25rem;
    border-left: ${theme.spacing()} solid var(--pixel);
    padding-left: ${theme.spacing()};
}

h3, span[role="heading"][aria-level="3"] {
    padding-left: ${theme.spacing(0.5)};
}
`}</style>;

type HtmlHeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export type Props = React.PropsWithChildren<HtmlHeadingProps>;

export const H1 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();

    return <>
        {styles(theme)}
        <h1 {...props} ref={ref} />
    </>;
});

export const H2 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();

    return <>
        {styles(theme)}
        <h2 {...props} ref={ref} />
    </>;
});

export const H3 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();

    return <>
        {styles(theme)}
        <h3 {...props} ref={ref} />
    </>;
});

export const H4 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();

    return <>
        {styles(theme)}
        <h4 {...props} ref={ref} />
    </>;
});

export const H5 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();

    return <>
        {styles(theme)}
        <h5 {...props} ref={ref} />
    </>;
});

export const H6 = React.forwardRef<HTMLHeadingElement, Props>(function(props: Props, ref: React.ForwardedRef<HTMLHeadingElement>) {
    const theme = useTheme();

    return <>
        {styles(theme)}
        <h6 {...props} ref={ref} />
    </>;
});

type ImposterProps = Props & Partial<{
    level: number
}>;

export const Imposter = React.forwardRef<HTMLSpanElement, ImposterProps>(function(props: ImposterProps, ref: React.ForwardedRef<HTMLSpanElement>) {
    const {level, ...spanProps} = props;
    const theme = useTheme();

    return <>
        {styles(theme)}
        <span role="heading" aria-level={level} {...spanProps} ref={ref} />
    </>;
});
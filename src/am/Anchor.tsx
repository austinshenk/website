import React from "react";
import {css} from "styled-jsx/css";
import Link, {LinkProps} from "next/link";
import {useTheme, Theme} from "./Theme";

function styles(theme: Theme) {
    return css.global`
    a {
        display: inline-block;
        text-decoration: none;
        font-family: system-san-serif;
        box-shadow: 0 ${theme.spacing(1)} var(--pixel) !important;
        color: var(--text);
    }
    
    a:active {
        transform: translate(0, 1px);
        box-shadow: 0 ${theme.spacing(1)} var(--pixel);
    }
`;
}

type HtmlAnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const HtmlAnchor = React.forwardRef<HTMLAnchorElement, HtmlAnchorProps>((props: HtmlAnchorProps) => {
    return <a am-interactive="" {...props}/>;
});

export type Props = React.PropsWithChildren<LinkProps & HtmlAnchorProps>;

function Anchor(props: Props, ref: React.ForwardedRef<HTMLAnchorElement>) {
    const theme = useTheme();
    const {href, as, replace, scroll, shallow, passHref, prefetch, locale, ...htmlAnchorProps} = props
    const anchorProps = {
        href, as, replace, scroll, shallow, prefetch, locale
    };
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <Link passHref {...anchorProps}>
            <HtmlAnchor {...htmlAnchorProps} ref={ref} />
        </Link>
    </>;
}

export const Component = Anchor;
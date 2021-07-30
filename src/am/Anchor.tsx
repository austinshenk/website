import React from "react";
import {css} from "styled-jsx/css";
import Link, {LinkProps} from "next/link";
import * as Container from "./Container";

const styles = css.global`
a {
    display: inline-block;
    text-decoration: none;
    font-family: system-san-serif;
    color: var(--text);
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    border-image-outset: 0 !important;
}

a:active {
    transform: translate(0, 1px);
}
`;

type HtmlAnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const HtmlAnchor = React.forwardRef<HTMLAnchorElement, HtmlAnchorProps>((props: HtmlAnchorProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
    return <Container.Component as="a" variation="anchor" {...props} ref={ref}>
        {props.children}
    </Container.Component>;
});

export type Props = React.PropsWithChildren<LinkProps & HtmlAnchorProps>;

function Anchor(props: Props, ref: React.ForwardedRef<HTMLAnchorElement>) {
    const anchorRef = React.useRef<HTMLAnchorElement>(null);
    const {href, as, replace, scroll, shallow, passHref, prefetch, locale, ...htmlAnchorProps} = props
    const anchorProps = {
        href, as, replace, scroll, shallow, prefetch, locale
    };

    return <>
        <style jsx global>{styles}</style>
        <Link passHref {...anchorProps}>
            <HtmlAnchor {...htmlAnchorProps} ref={ref ?? anchorRef}/>
        </Link>
    </>;
}

export const Component = React.forwardRef<HTMLAnchorElement, Props>(Anchor);
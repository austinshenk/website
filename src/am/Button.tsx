import React from "react";
import {css} from "styled-jsx/css";
import * as Container from "./Container";

const styles = css.global`
    button {
        appearance: none;
        border: none;
        color: inherit;
        font: 400 1rem system;
        background: none;
        padding: 0 !important;
    }
`;

type HtmlButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type Props = HtmlButtonProps & {
    containerBodyProps?: Container.BodyProps
};

function Button(props: Props, ref: React.ForwardedRef<HTMLButtonElement>) {
    return <>
        <style jsx global>{styles}</style>
        <Container.Component as="button" variation="button" {...props} ref={ref}>
            {props.children}
        </Container.Component>
    </>;
}

export const Component = React.forwardRef<HTMLButtonElement, Props>(Button);
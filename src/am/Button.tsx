import React from "react";
import {css} from "styled-jsx/css";

const styles = css.global`
    button {
        appearance: none;
        border: none;
        color: inherit;
        font: 400 1rem system;
        background: none;
    }
`;

type HtmlButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type Props = HtmlButtonProps;

function Button(props: Props, ref: React.ForwardedRef<HTMLButtonElement>) {
    return <>
        <style jsx global>{styles}</style>
        <button am-interactive="floating" {...props} ref={ref} />
    </>;
}

export const Component = React.forwardRef<HTMLButtonElement, Props>(Button);
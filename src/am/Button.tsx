import React from "react";
import * as Container from "./Container";
import {Theme, useTheme} from "./Theme";

const styles = (theme: Theme) => <style jsx global>{`
    button {
        appearance: none;
        background: none;
        padding: 0;
        color: inherit;
        font: 400 ${theme.typography.default} system;
    }
`}</style>;

type HtmlButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type Props = HtmlButtonProps;

function Button(props: Props, ref: React.ForwardedRef<HTMLButtonElement>) {
    const theme = useTheme();

    return <>
        {styles(theme)}
        <Container.Component as="button" variation="button" {...props} ref={ref}>
            {props.children}
        </Container.Component>
    </>;
}

export const Component = React.forwardRef<HTMLButtonElement, Props>(Button);
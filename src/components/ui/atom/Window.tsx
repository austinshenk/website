import React, {ForwardedRef} from "react";
import useTheme from "components/Theme";
import Am, {WindowProps as AmWindowProps, windowStyles} from "am";

type SectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type WindowProps = React.PropsWithChildren<AmWindowProps> & SectionProps;

function Window(props: WindowProps, ref: ForwardedRef<HTMLElement>) {
    const theme = useTheme();
    const styles = windowStyles(theme);

    return <>
        <style jsx global>{styles}</style>
        <section {...Am.window(props)} ref={ref} />
    </>;
}

export default React.forwardRef<HTMLElement, WindowProps>(Window);
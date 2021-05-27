import React from "react";
import Am, {ContainerProps as AmContainerProps, containerStyles} from "am";
import useTheme from "components/Theme";

type SectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type ContainerProps = React.PropsWithChildren<AmContainerProps> & SectionProps;

function Container(props: ContainerProps, ref: React.ForwardedRef<HTMLElement>) {
    const theme = useTheme();
    const styles = containerStyles(theme);

    return <>
        <style jsx global>{styles}</style>
        <section {...Am.container(props)} ref={ref} />
    </>;
}

export default React.forwardRef<HTMLElement, ContainerProps>(Container);
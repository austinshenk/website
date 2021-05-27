import React from "react";
import Head from "next/head";
import Am, {BodyProps as AmBodyProps, bodyStyles, bodyGlobalStyles} from "am";

type SectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type BodyProps = React.PropsWithChildren<AmBodyProps> & SectionProps;

function Body(props: BodyProps, ref: React.ForwardedRef<HTMLElement>) {
    return <>
        <Head>
            <style>{bodyGlobalStyles}</style>
        </Head>
        <style jsx global>{bodyStyles}</style>
        <section {...Am.body(props)} ref={ref} />
    </>;
}

export {BodyState} from "am";

export default React.forwardRef<HTMLElement, BodyProps>(Body);
import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Am from "am";
import Body from "atom/Body";
import {DialogRef, useDialog} from "atom/Dialog";
import Window from "atom/Window";
import Heading from "atom/Heading";
import {Tooltips} from "molecule/Tooltip";
import SkipToLinks from "molecule/SkipToLinks";

type Props = {
    theme: Am.Theme;
    title: React.ReactNode;
    description: string;
    children: [
        Am.Window.Props,
        (dialog: DialogRef) => React.ReactElement
    ];
};

const Preferences = dynamic(
    () => import("organism/Preferences"),
    { ssr: false }
);

function Basic({theme, title, description, children}: Props) {
    const dialog = useDialog();
    const [windowProps, content] = children;

    return <Am.ThemeProvider theme={theme}>
        <Heading.Provider>
            <Body.Lazy>
                {(finishLoading) => (<>
                    <Head>
                        <title>{title}</title>
                        <meta name="Description" content={description} />
                    </Head>
                    <SkipToLinks/>
                    <Window.Provider>
                        <Tooltips>
                            {(windowRef, tooltip) => (
                                <Window.Basic {...windowProps} ref={windowRef}>
                                    {content(dialog.current)}
                                    {tooltip}
                                </Window.Basic>
                            )}
                        </Tooltips>
                        <Preferences onLoad={finishLoading} dialogRef={dialog}/>
                    </Window.Provider>
                </>)}
            </Body.Lazy>
        </Heading.Provider>
    </Am.ThemeProvider>;
}

export default Basic;
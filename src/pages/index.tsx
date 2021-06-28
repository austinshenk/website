import dynamic from "next/dynamic";
import Head from "next/head";
import Am from "am";
import Anchor from "atom/Anchor";
import Body from "atom/Body";
import {useDialog} from "atom/Dialog";
import Window from "atom/Window";
import Heading from "atom/Heading";
import Header from "atom/Header";
import Nav from "atom/Nav";
import AccessibilityIcon from "atom/AccessibilityIcon";
import Tooltip, {Tooltips} from "../components/Tooltip";

const Preferences = dynamic(
    () => import("components/ui/Preferences"),
    { ssr: false }
);

const theme: Am.Theme = {
    spacing: (amount) => `${4 * (amount ?? 1)}px`,
}

function Home() {
    const dialog = useDialog();

    return <Am.ThemeProvider theme={theme}>
        <Heading.Provider>
            <Body.Lazy>
                {(finishLoading) => (<>
                    <Head>
                        <title>Austin Bookhart</title>
                        <meta name="Description" content="A personal portfolio website." />
                    </Head>
                    <Am.Container.Component floating id="skip-to-links">
                        <Anchor.InternalElement elementId="main">Skip to Content</Anchor.InternalElement>
                    </Am.Container.Component>
                    <Window.Provider>
                        <Tooltips>
                            {(windowRef, tooltip) => (
                                <Window.Basic {...Am.grid({alignContent: "start", gap: "10px 0"})} ref={windowRef}>
                                    <Header>
                                        <Nav>
                                            <Anchor.InternalElement elementId="">About</Anchor.InternalElement>
                                            <Anchor.InternalElement elementId="">Blog</Anchor.InternalElement>
                                        </Nav>
                                        <Tooltip content="Accessibility">
                                            <Am.Button.Component onClick={dialog.current?.open} aria-label="Accessibility" id="btn-preferences">
                                                <AccessibilityIcon />
                                            </Am.Button.Component>
                                        </Tooltip>
                                    </Header>
                                    <main id="main" tabIndex={0}>
                                        <Heading.Component>
                                            <>
                                                <Anchor.InternalElement id="about" elementId="about" aria-labelledby="about-label">#</Anchor.InternalElement>
                                                <span id="about-label">About</span>
                                            </>
                                            <p>
                                                Hello, my name is Austin Bookhart. I'm a Software Engineer that has worked primarily as a Full-Stack Developer with an emphasis towards Frontend development. My goal is to create UIs that facilitate concise user experiences and are accessible to a wide variety of audiences.
                                            </p>
                                        </Heading.Component>
                                    </main>
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

export default Home;
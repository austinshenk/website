import {useRef} from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Am from "am";
import Container from "components/ui/atom/Container";
import Body from "components/ui/molecule/Body";
import Window from "components/ui/molecule/Window";
import Link from "components/ui/Link";
import Header from "components/ui/Header";
import Nav from "components/ui/Nav";
import Button from "components/ui/Button";
import AccessibilityIcon from "components/ui/icon/Accessibility";
import H1 from "components/ui/H1";
import {DialogRef} from "components/ui/Dialog";
import Tooltip, {Tooltips} from "../components/Tooltip";
import {Theme, ThemeProvider} from "../components/Theme";

const Preferences = dynamic(
    () => import("components/ui/Preferences"),
    { ssr: false }
);

const theme: Theme = {
    spacing: (amount) => `${4 * (amount ?? 1)}px`,
}

function Home() {
    const dialog = useRef<DialogRef>({
        open: () => {}
    });

    return <ThemeProvider theme={theme}>
        <Body.Lazy>
            {(finishLoading) => (<>
                <Head>
                    <title>Austin Bookhart</title>
                    <meta name="Description" content="A personal portfolio website." />
                </Head>
                <Container variation="floating" id="skip-to-links">
                    <Link href="#main">Skip to Content</Link>
                </Container>
                <Window.Provider>
                    <Tooltips>
                        {(windowRef, tooltip) => (
                            <Window.Basic {...Am.grid({alignContent: "start", gap: "10px 0"})} ref={windowRef}>
                                <Header>
                                    <Nav>
                                        <Link href="#">About</Link>
                                        <Link href="#">Blog</Link>
                                    </Nav>
                                    <Tooltip content="Accessibility">
                                        <Button onClick={dialog.current?.open} aria-label="Accessibility" id="btn-preferences">
                                            <AccessibilityIcon />
                                        </Button>
                                    </Tooltip>
                                </Header>
                                <main id="main" tabIndex={0}>
                                    <H1 id="about" text="About" />
                                    <p>
                                    Hello, my name is Austin Bookhart. I'm a Software Engineer that has worked primarily as a Full-Stack Developer with an emphasis towards Frontend development. My goal is to create UIs that facilitate concise user experiences and are accessible to a wide variety of audiences.
                                    </p>
                                </main>
                                {tooltip}
                            </Window.Basic>
                        )}
                    </Tooltips>
                    <Preferences onLoad={finishLoading} dialogRef={dialog}/>
                </Window.Provider>
            </>)}
        </Body.Lazy>
    </ThemeProvider>;
}

export default Home;
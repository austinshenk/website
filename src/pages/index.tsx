import {useState} from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Body from "components/ui/Body";
import Container from "components/ui/Container";
import Link from "components/ui/Link";
import Window, {WindowController} from "components/ui/Window";
import Header from "components/ui/Header";
import Nav from "components/ui/Nav";
import Button from "components/ui/Button";
import AccessibilityIcon from "components/ui/icon/Accessibility";
import H1 from "components/ui/H1";
import {DialogRef} from "components/ui/Dialog";
import Tooltip, {TooltipProvider} from "../components/Tooltip";

const PreferencesDialog = dynamic(
    () => import("components/ui/PreferencesDialog"),
    { ssr: false }
);

function Home() {
    const [dialog, setDialog] = useState<DialogRef>({
        open: () => {}
    });

    return <Body>
        {(finishLoading) => (<>
            <Head>
                <title>Austin Bookhart</title>
                <meta name="Description" content="A personal portfolio website." />
            </Head>
            <Container floating id="skip-to-links">
                <Link href="#main">Skip to Content</Link>
            </Container>
            <WindowController>
                <TooltipProvider>
                    {(windowRef, tooltip) => (
                        <Window ref={windowRef} am-grid="" am-grid-align-content="start" style={{gap: "10px 0"}}>
                            <Header>
                                <Nav>
                                    <Link href="#">About</Link>
                                    <Link href="#">Blog</Link>
                                </Nav>
                                <Tooltip content="Accessibility">
                                    <Button onClick={() => dialog.open()} aria-label="Accessibility" id="btn-preferences">
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
                        </Window>
                    )}
                </TooltipProvider>
                <PreferencesDialog onLoad={() => finishLoading()} dialogRef={setDialog}/>
            </WindowController>
        </>)}
    </Body>;
}

export default Home;
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Body, {BodyLoadedProp} from "components/ui/Body";
import Container from "components/ui/Container";
import Link from "components/ui/Link";
import Window from "components/ui/Window";
import Header from "components/ui/Header";
import Nav from "components/ui/Nav";
import Button from "components/ui/Button";
import AccessibilityIcon from "components/ui/icon/Accessibility";
import H1 from "components/ui/H1";
import {DialogRef} from "components/Dialog";
import Tooltip, {TooltipProvider} from "../components/Tooltip";

const PreferencesDialog = dynamic(
    () => import("components/ui/PreferencesDialog"),
    { ssr: false }
);

function Home() {
    const [bodyLoaded, setBodyLoaded] = useState<BodyLoadedProp>("unloaded");
    const dialog = useRef<DialogRef>();

    useEffect(() => {
        if (bodyLoaded === "loading") {
            setTimeout(() => setBodyLoaded("loaded"), 300);
        }
    }, [bodyLoaded]);

    return <Body loaded={bodyLoaded}>
        <Head>
            <title>Austin Bookhart</title>
            <meta name="Description" content="A personal portfolio website." />
            <style>
                {`body {
                    background: #808080;
                }
                [am-body] {
                    opacity: 0;
                }`}
            </style>
        </Head>
        <Container floating id="skip-to-links">
            <Link href="#main">Skip to Content</Link>
        </Container>
        <Window active={!dialog.current?.isOpen}>
            <TooltipProvider>
                <div am-grid="" am-grid-align-content="start" style={{gap: "10px 0"}}>
                    <Header>
                        <Nav>
                            <Link href="#">About</Link>
                            <Link href="#">Blog</Link>
                        </Nav>
                        <Tooltip content="Accessibility">
                            <Button onClick={() => dialog.current?.open()} aria-label="Accessibility" id="btn-preferences">
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
                </div>
            </TooltipProvider>
        </Window>
        <PreferencesDialog onLoad={() => setBodyLoaded("loading")} dialogRef={dialog}/>
    </Body>;
}

export default Home;
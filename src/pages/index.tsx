import Image from "next/image";
import css from "styled-jsx/css";
import Am from "am";
import Anchor from "atom/Anchor";
import Heading from "atom/Heading";
import AccessibilityIcon from "atom/AccessibilityIcon";
import Tooltip from "molecule/Tooltip";
import Basic from "template/Basic";

const theme: Am.Theme = Am.ThemeGenerator();

const styles = css.global`
main {
  background-color: var(--background-main) !important;
  width: 100%;
  max-width: 1000px;
}
`;

function Home() {
    return <Basic theme={theme}
                  title="Austin Bookhart"
                  description="A personal portfolio website.">
            {Am.grid({alignContent: "start", gap: `${theme.spacing()} 0`})}
            {(preferencesDialog) => <>
                <style jsx global>{styles}</style>
                <Am.Container.Component variation="container-alternative" as="main" id="main">
                    <Heading.Component {...Am.flex({justifyContent: "start", alignItems: "center"})}>
                        <>
                            <Anchor.InternalElement id="welcome" elementId="welcome" aria-labelledby="welcome-label">#</Anchor.InternalElement>
                            <span id="welcome-label" {...Am.flexItem({grow: 2})}>Welcome</span>
                            <Tooltip content="Accessibility">
                                <Am.Button.Component onClick={preferencesDialog.open} aria-label="Accessibility" id="btn-preferences">
                                    <AccessibilityIcon />
                                </Am.Button.Component>
                            </Tooltip>
                        </>
                        <>
                            <p style={{minHeight: "124px"}}>
                                <Am.Container.Component style={{display: "inline-flex", float: "left", marginRight: "8px"}}>
                                    <Image src="/profile.jpeg" alt="Austin Bookhart" width={100} height={100} />
                                </Am.Container.Component>
                                Hello, my name is Austin Bookhart. I'm a Software Engineer that has worked primarily as a Full-Stack Software Engineer with an emphasis towards Frontend development. My goal is to create UIs that facilitate concise user experiences and are accessible to a wide variety of audiences.
                            </p>
                            <Heading.Component>
                                <>
                                    <Anchor.InternalElement id="welcome" elementId="welcome" aria-labelledby="welcome-label">#</Anchor.InternalElement>
                                    <span id="welcome-label">What is this?</span>
                                </>
                                <>
                                    <p>This is mainly a playground for me to work on ideas that I think should be core to any UI on the web. There are a lot of fundamentally similar ideas/components that are shared by many UIs and applications</p>
                                </>
                            </Heading.Component>
                        </>
                    </Heading.Component>
                </Am.Container.Component>
            </>}
    </Basic>;
}

export default Home;
import css from "styled-jsx/css";
import Am from "am";
import Anchor from "atom/Anchor";
import Heading from "atom/Heading";
import Header from "atom/Header";
import Nav from "atom/Nav";
import AccessibilityIcon from "atom/AccessibilityIcon";
import Tooltip from "molecule/Tooltip";
import Basic from "template/Basic";

const theme: Am.Theme = {
    spacing: (amount) => `${4 * (amount ?? 1)}px`,
}

const styles = css.global`
main {
  background-color: var(--background-main) !important;
}

header, main {
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
                <Header>
                    <Nav>
                        <Anchor.InternalElement elementId="">About</Anchor.InternalElement>
                        <Anchor.InternalElement elementId="">Blog</Anchor.InternalElement>
                    </Nav>
                    <Tooltip content="Accessibility">
                        <Am.Button.Component onClick={preferencesDialog.open} aria-label="Accessibility" id="btn-preferences">
                            <AccessibilityIcon />
                        </Am.Button.Component>
                    </Tooltip>
                </Header>
                <Am.Container.Component variation="container-alternative" as="main" id="main">
                    <Heading.Component>
                        <>
                            <Anchor.InternalElement id="about" elementId="about" aria-labelledby="about-label">#</Anchor.InternalElement>
                            <span id="about-label">About</span>
                        </>
                        <p>
                            Hello, my name is Austin Bookhart. I'm a Software Engineer that has worked primarily as a Full-Stack Developer with an emphasis towards Frontend development. My goal is to create UIs that facilitate concise user experiences and are accessible to a wide variety of audiences.
                        </p>
                    </Heading.Component>
                </Am.Container.Component>
            </>}
    </Basic>;
}

export default Home;
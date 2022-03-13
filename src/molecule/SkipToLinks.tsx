import React from "react";
import css from "styled-jsx/css";
import Am from "am";
import Anchor from "atom/Anchor";

function styles(theme: Am.Theme) { return css.global`
#skip-to-links {
    position: fixed;
    z-index: 5;
    top: -${theme.spacing(3)};
    left: 50%;
    transform: translate3d(-50%, -100%, 0);
    transition: transform .3s ease-in-out;
}

#skip-to-links:focus-within {
    transform: translate3d(-50%, 0, 0);
}
`}

const focus = (id: string) => () => {
    const element = document.getElementById(id);

    element?.focus();
};

function SkipToLinks() {
    const theme = Am.useTheme();
    const style = styles(theme);

    return <>
        <style jsx global>{style}</style>
        <Am.Container.Component id="skip-to-links">
            <Anchor.InternalElement elementId="main" onClick={focus("main")}>Skip to Content</Anchor.InternalElement>
        </Am.Container.Component>
    </>;
}

export default SkipToLinks;
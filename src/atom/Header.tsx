import React from "react";
import Am from "am";

type Props = React.PropsWithChildren<{}>;

function Header({...props}: Props) {
    return <Am.Container.Component as="header" {...Am.flex({justifyContent: "space-around"})} {...props} />;
}

export default Header;
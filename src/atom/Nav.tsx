import React from "react";
import Am from "am";

type Props = React.PropsWithChildren<{}>;

function Nav({...props}: Props) {
    return <nav {...Am.flex({justifyContent: "space-evenly"})} {...Am.flexItem({grow: 2})} {...props} />;
}

export default Nav;
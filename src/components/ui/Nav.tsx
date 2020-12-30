import React from "react";

type Props = React.PropsWithChildren<{}>;

function Nav({...props}: Props) {
    return <nav am-flexbox="" am-flexbox-justify-content="space-evenly" am-flexitem="" am-flexitem-grow="2" {...props} />;
}

export default Nav;
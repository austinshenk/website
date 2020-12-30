import React from "react";

type Props = React.PropsWithChildren<{}>;

function Header({...props}: Props) {
    return <header am-container="" am-flexbox="" am-flexbox-justify-content="space-around" {...props} />;
}

export default Header;
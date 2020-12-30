import React from "react";

type Props = React.PropsWithChildren<{
    [key:string]: any
}>

function Link(props: Props) {
    return <a am-interactive="" {...props} />;
}

export default Link;
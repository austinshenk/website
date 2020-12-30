import React from "react";

type Props = React.PropsWithChildren<{
    active: boolean,
    fullscreen?: boolean,
    [key:string]: any
}>

function Window({active, fullscreen, ...props}: Props) {
    return <section am-window={active ? "active" : "inactive"} am-window-fullscreen={fullscreen?.toString()} {...props} />;
}

export default Window;
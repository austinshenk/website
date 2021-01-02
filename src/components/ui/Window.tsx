import React from "react";

type Props = React.PropsWithChildren<{
    active: boolean,
    fullscreen?: boolean,
    [key:string]: any
}>

function Window({active, fullscreen, ...props}: Props, ref) {
    return <section am-window={active ? "active" : "inactive"} am-window-fullscreen={fullscreen?.toString()} {...props} ref={ref} />;
}

Window.displayName = "Window";

export default React.forwardRef(Window);
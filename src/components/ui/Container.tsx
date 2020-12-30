import React from "react";

type Props = React.PropsWithChildren<{
    floating?: boolean,
    [key:string]: any
} | {
    invisible?: boolean,
    [key:string]: any
}>

const containerTypeToString = (floating?: boolean, invisible?: boolean): String => {
    if (floating)
        return "floating";

    if (invisible)
        return "invisible";

    return "";
};

function Container({floating, invisible, ...rest}: Props, ref) {
    return <section am-container={containerTypeToString(floating, invisible)} {...rest} ref={ref}/>;
}

Container.displayName = "Container";

export default React.forwardRef(Container);
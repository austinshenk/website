import React, {ForwardedRef} from "react";
import Am from "am";
import ContainerProps from "am/container";

type Props = React.PropsWithChildren<{
    floating?: boolean,
    [key:string]: any
} | {
    invisible?: boolean,
    [key:string]: any
}>

const toAttribute = (floating?: boolean, invisible?: boolean): ContainerProps => {
    if (floating)
        return "floating";

    if (invisible)
        return "invisible";

    return "";
};

function Container({floating, invisible, am, ...props}: Props, ref: ForwardedRef<Element>) {
    return <Am as="section" container={toAttribute(floating, invisible)} {...props} ref={ref} />;
}

Container.displayName = "Container";

export default React.forwardRef(Container);
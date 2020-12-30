import React from "react";

type Props = React.PropsWithChildren<{
    onClick: (event: React.SyntheticEvent) => void
    [key:string]: any
}>;

function Button({onClick, ...props}: Props) {
    return <button am-interactive="floating" onClick={onClick} {...props} />;
}

export default Button;
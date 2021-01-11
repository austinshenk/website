import React from "react";
import Link from "./Link";
import Tooltip from "../Tooltip";

type Props = React.PropsWithChildren<{
    id: string,
    text: string
}>;

function H1({id, text}: Props) {
    const labelId = `${id}-label`;

    return <h1>
        <Link id={id} href={"#" + id} am-align="center" aria-labelledby={labelId}>#</Link>
        <span id={labelId}>{text}</span>
    </h1>;
}

export default H1;
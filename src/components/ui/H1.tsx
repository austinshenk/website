import React from "react";
import Link from "./Link";

type Props = React.PropsWithChildren<{
    id: string,
    text: string
}>;

function H1({id, text}: Props) {
    return <h1>
        <Link id={id} href={"#" + id} am-align="center">#</Link>
        {text}
    </h1>;
}

export default H1;
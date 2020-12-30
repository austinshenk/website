import React from "react";

type Props = React.PropsWithChildren<{
    loaded: boolean;
}>;

function Body({loaded, ...props}: Props) {
    return <section am-body={loaded.toString()} {...props} />;
}

export default Body;
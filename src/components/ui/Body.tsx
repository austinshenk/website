import React from "react";

type Props = React.PropsWithChildren<{
    loaded: BodyLoadedProp;
}>;

export type BodyLoadedProp = "unloaded" | "loading" | "loaded";

function Body({loaded, ...props}: Props) {
    return <section am-body={loaded.toString()} {...props} />;
}

export default Body;
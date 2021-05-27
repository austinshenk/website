import React from "react";
import LazyBody from "components/ui/Body";

function Body(props: {finishLoading: () => void}) {
    React.useEffect(() => {
        props.finishLoading();
    }, []);

    return <div>Hello</div>;
}

export default function Editor() {
    return <LazyBody>
        {(finishLoading) => (<>
            <Body finishLoading={finishLoading}/>
        </>)}
    </LazyBody>
}
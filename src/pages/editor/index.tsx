import React from "react";
import AsyncBody from "components/ui/Body";

function Body(props: {finishLoading: () => void}) {
    React.useEffect(() => {
        props.finishLoading();
    }, []);

    return <div>Hello</div>;
}

export default function Editor() {
    return <AsyncBody>
        {(finishLoading) => (<>
            <Body finishLoading={finishLoading}/>
        </>)}
    </AsyncBody>
}
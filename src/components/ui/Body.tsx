import React, {useEffect, useState} from "react";

type Props = React.PropsWithChildren<{}>;

function Body({...props}: Props) {
    const [loaded, setLoaded] = useState<boolean>(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    return <section am-body={loaded.toString()} {...props} />;
}

export default Body;
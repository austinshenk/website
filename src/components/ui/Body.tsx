import React, {ReactNode, useEffect, useState} from "react";
import Head from "next/head";

type Props = {
    children: (finishLoading: () => void) => ReactNode;
};

enum LoadState {
    UNLOADED = "unloaded",
    LOADING = "loading",
    LOADED = "loaded"
}

function Body({children}: Props) {
    const [loaded, setLoaded] = useState<LoadState>(LoadState.UNLOADED);
    const finishLoading = () => setLoaded(LoadState.LOADING);

    useEffect(() => {
        if (loaded === LoadState.LOADING) {
            setTimeout(() => setLoaded(LoadState.LOADED), 300);
        }
    }, [loaded]);

    return <>
        <Head>
            <style>{
                `body {
                    background: #808080;
                }
                [am-body] {
                    opacity: 0;
                }`
            }</style>
        </Head>
        <section am-body={loaded.toString()}>
            {children(finishLoading)}
        </section>
    </>;
}

export default Body;
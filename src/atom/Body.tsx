import React from "react";
import Am from "am";

type LazyBodyProps = {
    children: (finishLoading: () => void) => React.ReactNode;
};

function LazyBody({children}: LazyBodyProps, ref: React.ForwardedRef<HTMLElement>) {
    const loader = useLoader();

    return <Am.Body.Component state={loader.value} ref={ref}>
        {children(loader.start)}
    </Am.Body.Component>;
}

type EagerBodyProps = React.PropsWithChildren<{}>;

function EagerBody({children}: EagerBodyProps, ref: React.ForwardedRef<HTMLElement>) {
    const loader = useLoader();

    React.useEffect(loader.start, []);

    return <Am.Body.Component state={loader.value} ref={ref}>
        {children}
    </Am.Body.Component>;
}

const useLoader = () => {
    const [loadState, setLoaded] = React.useState<Am.Body.State>(Am.Body.State.UNLOADED);

    React.useEffect(() => {
        if (loaderHasStarted(loadState))
            setTimeout(() => setLoaded(Am.Body.State.LOADED), 300);
    }, [loadState]);

    return {
        value: loadState,
        start: () => setLoaded(Am.Body.State.LOADING),
    }
}

const loaderHasStarted = (loadState: Am.Body.State) => loadState === Am.Body.State.LOADING;

export default {
    Lazy: React.forwardRef<HTMLElement, LazyBodyProps>(LazyBody),
    Eager: React.forwardRef<HTMLElement, EagerBodyProps>(EagerBody),
};
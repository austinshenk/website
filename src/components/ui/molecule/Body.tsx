import React from "react";
import Atom, {BodyState} from "components/ui/atom";

type LazyBodyProps = {
    children: (finishLoading: () => void) => React.ReactNode;
};

function LazyBody({children}: LazyBodyProps, ref: React.ForwardedRef<HTMLElement>) {
    const loader = useLoader();

    return <Atom.Body state={loader.value} ref={ref}>
        {children(loader.start)}
    </Atom.Body>;
}

type EagerBodyProps = React.PropsWithChildren<{}>;

function EagerBody({children}: EagerBodyProps, ref: React.ForwardedRef<HTMLElement>) {
    const loader = useLoader();

    React.useEffect(loader.start, []);

    return <Atom.Body state={loader.value} ref={ref}>
        {children}
    </Atom.Body>;
}

const useLoader = () => {
    const [loadState, setLoaded] = React.useState(BodyState.UNLOADED);

    React.useEffect(() => {
        if (loaderHasStarted(loadState))
            setTimeout(() => setLoaded(BodyState.LOADED), 300);
    }, [loadState]);

    return {
        value: loadState,
        start: () => setLoaded(BodyState.LOADING),
    }
}

const loaderHasStarted = (loadState: BodyState) => loadState === BodyState.LOADING;

export default {
    Lazy: React.forwardRef<HTMLElement, LazyBodyProps>(LazyBody),
    Eager: React.forwardRef<HTMLElement, EagerBodyProps>(EagerBody),
};
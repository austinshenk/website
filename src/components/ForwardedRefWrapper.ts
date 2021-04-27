import {ForwardedRef, MutableRefObject} from "react";

const isRefObject = <T>(ref: ForwardedRef<T>): ref is MutableRefObject<T | null> => {
    return ref !== null && ref !== undefined && typeof ref !== "function";
};

const isFunction = <T>(ref: ForwardedRef<T>): ref is ((instance: T | null) => void) => {
    return typeof ref === "function";
};

type Current<T> = {
    (value: T): void;
    (value?: any): T | null;
}

const forwardedRef = <T>(ref: ForwardedRef<T>) => {
    const current:Current<T> = (value: any) => {
        if (value) {
            if (isRefObject(ref))
                ref.current = value;
        } else {
            if (isRefObject(ref))
                return ref.current;
            else
                return null;
        }

        return null;
    }

    return {
        isFunction: () => isFunction(ref),
        isRefObject: () => isRefObject(ref),
        current
    };
}

export default forwardedRef;